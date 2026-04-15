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
  sexualEthics: string
  dressCode: string
  workView: string
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

export const religionRecords = records as ReligionRecord[]

export const filterOptions = {
  deityType: ["すべて", "唯一神", "多神", "無神論的"] as const,
  afterlife: ["すべて", "天国", "地獄", "輪廻", "解脱", "浄土往生", "最後の審判"] as const,
  disciplineStrictness: ["すべて", "高", "中", "低"] as const,
  practiceBurden: ["すべて", "高", "中", "低"] as const,
  alcohol: ["すべて", "可", "制限", "禁止"] as const,
}

export type FilterState = {
  deityType: (typeof filterOptions.deityType)[number]
  afterlife: (typeof filterOptions.afterlife)[number]
  disciplineStrictness: (typeof filterOptions.disciplineStrictness)[number]
  practiceBurden: (typeof filterOptions.practiceBurden)[number]
  alcohol: (typeof filterOptions.alcohol)[number]
}

export const defaultFilters: FilterState = {
  deityType: "すべて",
  afterlife: "すべて",
  disciplineStrictness: "すべて",
  practiceBurden: "すべて",
  alcohol: "すべて",
}
