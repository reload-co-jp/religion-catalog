import records from "data/religions.json"

export type Level = "高" | "中" | "低"
export type Distance = "近い" | "遠い" | "不可知"
export type DeityType = "唯一神" | "多神" | "無神論的"
export type WorshipFrequency = "毎日" | "週1" | "任意"
export type AlcoholRule = "可" | "制限" | "禁止"
export type Structure = "中央集権" | "分散"

export type ReligionRecord = {
  id: string
  religion: string
  sect: string
  foundedEra: string
  originRegion: string
  founder: string
  followers: string
  distributionRegions: string[]
  deityType: DeityType
  hasPersonhood: boolean
  createdWorld: boolean
  interventionLevel: Level
  distanceToBelievers: Distance
  hasSavior: boolean
  worldview: string
  humanView: string
  goodEvilView: string
  afterlife: string[]
  salvationMethods: string[]
  causeOfSuffering: string
  idealWayOfLife: string
  taboos: string[]
  worshipFrequency: WorshipFrequency
  prayerStyle: string
  hasMeditationPractice: boolean
  hasFasting: boolean
  donationImportance: Level
  ritualImportance: Level
  scriptureImportance: Level
  communityImportance: Level
  clergyRole: string
  organizationStructure: Structure
  localConnection: Level
  joiningDifficulty: Level
  leavingDifficulty: Level
  dietaryRestrictions: string[]
  alcohol: AlcoholRule
  marriageView: string
  marriageTags: string[]
  sexualEthics: string
  dressCode: string
  dressTags: string[]
  workView: string
  workTags: string[]
  politicsRelation: string
  tags: string[]
  practiceBurden: Level
  disciplineStrictness: Level
  sources: Array<{
    title: string
    type: string
  }>
  updatedAt: string
  notes: string
}

type BaseReligionRecord = Omit<
  ReligionRecord,
  "marriageTags" | "dressTags" | "workTags"
>

const uniqueValues = <Value extends string>(
  values: Value[],
): Value[] => Array.from(new Set(values))

function inferMarriageTags(text: string): string[] {
  const tags = new Set<string>()

  if (text.includes("結婚を重視") || text.includes("結婚は重要")) {
    tags.add("結婚重視")
  }
  if (text.includes("家庭") || text.includes("家族")) {
    tags.add("家庭重視")
  }
  if (
    text.includes("共同体") ||
    text.includes("継承") ||
    text.includes("家系")
  ) {
    tags.add("共同体との結びつき")
  }
  if (text.includes("独身") || text.includes("修道") || text.includes("修行")) {
    tags.add("禁欲志向あり")
  }
  if (text.includes("在家") || text.includes("両立")) {
    tags.add("生活との両立")
  }

  return uniqueValues([...tags])
}

function inferWorkTags(text: string): string[] {
  const tags = new Set<string>()

  if (text.includes("召命") || text.includes("神")) tags.add("宗教的使命感")
  if (text.includes("奉仕") || text.includes("分かち合い")) {
    tags.add("奉仕重視")
  }
  if (text.includes("商取引") || text.includes("規範")) {
    tags.add("経済活動に規範あり")
  }
  if (text.includes("修行")) tags.add("修養の場としての仕事")
  if (text.includes("義務") || text.includes("役割")) tags.add("役割重視")
  if (text.includes("休息") || text.includes("安息")) tags.add("休息日重視")
  if (text.includes("自立") || text.includes("労働")) tags.add("労働重視")

  return uniqueValues([...tags])
}

function inferDressTags(text: string): string[] {
  const tags = new Set<string>()

  if (text.includes("慎み") || text.includes("節度")) tags.add("慎み重視")
  if (text.includes("頭部") || text.includes("覆う")) tags.add("頭部に関する習慣")
  if (text.includes("伝統衣装") || text.includes("ターバン")) {
    tags.add("象徴的な服装あり")
  }
  if (text.includes("作法") || text.includes("儀礼")) tags.add("儀礼時の服装意識")
  if (text.includes("額印")) tags.add("宗教的な目印あり")
  if (text.includes("少ない") || text.includes("自由")) tags.add("日常の自由度高め")

  return uniqueValues([...tags])
}

const sourceRecords = records as BaseReligionRecord[]

export const religionRecords: ReligionRecord[] = sourceRecords.map((record) => ({
  ...record,
  marriageTags: inferMarriageTags(record.marriageView),
  dressTags: inferDressTags(record.dressCode),
  workTags: inferWorkTags(record.workView),
}))

export function getReligionById(id: string) {
  return religionRecords.find((record) => record.id === id) ?? null
}

export function getComparisonTarget(
  record: ReligionRecord,
  candidateRecords: ReligionRecord[],
) {
  return (
    candidateRecords.find(
      (item) => item.id !== record.id && item.religion === record.religion,
    ) ??
    candidateRecords.find((item) => item.id !== record.id) ??
    null
  )
}

export const filterOptions = {
  deityType: ["唯一神", "多神", "無神論的"] as const,
  afterlife: ["天国", "地獄", "輪廻", "解脱", "浄土往生", "最後の審判"] as const,
  disciplineStrictness: ["高", "中", "低"] as const,
  practiceBurden: ["高", "中", "低"] as const,
  alcohol: ["可", "制限", "禁止"] as const,
  communityImportance: ["高", "中", "低"] as const,
  worshipFrequency: ["毎日", "週1", "任意"] as const,
  marriageTags: uniqueValues(
    religionRecords.flatMap((record) => record.marriageTags),
  ),
  workTags: uniqueValues(religionRecords.flatMap((record) => record.workTags)),
  dressTags: uniqueValues(religionRecords.flatMap((record) => record.dressTags)),
}

export type FilterState = {
  deityType: Array<(typeof filterOptions.deityType)[number]>
  afterlife: Array<(typeof filterOptions.afterlife)[number]>
  disciplineStrictness: Array<(typeof filterOptions.disciplineStrictness)[number]>
  practiceBurden: Array<(typeof filterOptions.practiceBurden)[number]>
  alcohol: Array<(typeof filterOptions.alcohol)[number]>
  communityImportance: Array<(typeof filterOptions.communityImportance)[number]>
  worshipFrequency: Array<(typeof filterOptions.worshipFrequency)[number]>
  marriageTags: string[]
  workTags: string[]
  dressTags: string[]
}

export const defaultFilters: FilterState = {
  deityType: [],
  afterlife: [],
  disciplineStrictness: [],
  practiceBurden: [],
  alcohol: [],
  communityImportance: [],
  worshipFrequency: [],
  marriageTags: [],
  workTags: [],
  dressTags: [],
}
