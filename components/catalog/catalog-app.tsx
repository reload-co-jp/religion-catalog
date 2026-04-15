"use client"

import { useMemo, useState } from "react"
import styles from "components/catalog/catalog-app.module.css"
import {
  defaultFilters,
  filterOptions,
  type FilterState,
  type ReligionRecord,
} from "lib/religion"

type CatalogAppProps = {
  records: ReligionRecord[]
}

function boolLabel(value: boolean, truthy = "あり", falsy = "なし") {
  return value ? truthy : falsy
}

function joinList(values: string[]) {
  return values.length > 0 ? values.join(" / ") : "特記事項なし"
}

const compareRows: Array<{
  key: string
  label: string
  render: (record: ReligionRecord) => string
}> = [
  {
    key: "overview",
    label: "概要",
    render: (record) => `${record.religion} / ${record.sect}`,
  },
  { key: "deityType", label: "神タイプ", render: (record) => record.deityType },
  {
    key: "godCharacter",
    label: "神観の特徴",
    render: (record) =>
      `人格性: ${boolLabel(record.hasPersonhood, "あり", "なし")} / 距離感: ${record.distanceToBelievers}`,
  },
  {
    key: "afterlife",
    label: "死後観",
    render: (record) => record.afterlife.join(" / "),
  },
  {
    key: "salvationMethods",
    label: "救済方法",
    render: (record) => joinList(record.salvationMethods),
  },
  {
    key: "disciplineStrictness",
    label: "戒律の厳しさ",
    render: (record) => record.disciplineStrictness,
  },
  {
    key: "practiceBurden",
    label: "実践負荷",
    render: (record) => record.practiceBurden,
  },
  { key: "alcohol", label: "飲酒", render: (record) => record.alcohol },
  {
    key: "communityImportance",
    label: "共同体重視度",
    render: (record) => record.communityImportance,
  },
  {
    key: "worshipFrequency",
    label: "礼拝頻度",
    render: (record) => record.worshipFrequency,
  },
  {
    key: "practiceStyle",
    label: "祈り・実践形式",
    render: (record) => record.prayerStyle,
  },
  {
    key: "diet",
    label: "食事制限",
    render: (record) => joinList(record.dietaryRestrictions),
  },
  {
    key: "tags",
    label: "特徴タグ",
    render: (record) => joinList(record.tags),
  },
]

const detailComparisons = [
  {
    label: "神観",
    accessor: (record: ReligionRecord) =>
      `${record.deityType} / 距離感: ${record.distanceToBelievers}`,
  },
  {
    label: "実践",
    accessor: (record: ReligionRecord) =>
      `${record.worshipFrequency} / 実践負荷: ${record.practiceBurden}`,
  },
  {
    label: "生活制約",
    accessor: (record: ReligionRecord) =>
      `飲酒: ${record.alcohol} / 戒律: ${record.disciplineStrictness}`,
  },
]

const selectOptions = [
  {
    key: "deityType",
    label: "神タイプ",
    values: filterOptions.deityType,
  },
  {
    key: "afterlife",
    label: "死後観",
    values: filterOptions.afterlife,
  },
  {
    key: "disciplineStrictness",
    label: "戒律の厳しさ",
    values: filterOptions.disciplineStrictness,
  },
  {
    key: "practiceBurden",
    label: "実践負荷",
    values: filterOptions.practiceBurden,
  },
  {
    key: "alcohol",
    label: "飲酒可否",
    values: filterOptions.alcohol,
  },
] as const

const getComparisonTarget = (
  record: ReligionRecord,
  filteredRecords: ReligionRecord[],
  allRecords: ReligionRecord[],
) => {
  const filteredTarget = filteredRecords.find((item) => item.id !== record.id)

  return (
    filteredTarget ??
    allRecords.find(
      (item) => item.id !== record.id && item.religion === record.religion,
    ) ?? allRecords.find((item) => item.id !== record.id) ?? null
  )
}

export const CatalogApp = ({ records }: CatalogAppProps) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [selectedId, setSelectedId] = useState(records[0]?.id ?? "")

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        if (
          filters.deityType !== "すべて" &&
          record.deityType !== filters.deityType
        ) {
          return false
        }

        if (
          filters.afterlife !== "すべて" &&
          !record.afterlife.includes(filters.afterlife)
        ) {
          return false
        }

        if (
          filters.disciplineStrictness !== "すべて" &&
          record.disciplineStrictness !== filters.disciplineStrictness
        ) {
          return false
        }

        if (
          filters.practiceBurden !== "すべて" &&
          record.practiceBurden !== filters.practiceBurden
        ) {
          return false
        }

        if (filters.alcohol !== "すべて" && record.alcohol !== filters.alcohol) {
          return false
        }

        return true
      }),
    [filters, records],
  )

  const selectedRecord =
    filteredRecords.find((record) => record.id === selectedId) ??
    records.find((record) => record.id === selectedId) ??
    filteredRecords[0] ??
    records[0]

  const comparisonTarget = selectedRecord
    ? getComparisonTarget(selectedRecord, filteredRecords, records)
    : null

  const onFilterChange = <Key extends keyof FilterState>(
    key: Key,
    value: FilterState[Key],
  ) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Neutral Religion Catalog</p>
        <h1 className={styles.heroTitle}>宗教と宗派の特徴を、中立的に比較する。</h1>
        <p className={styles.heroText}>
          教義、神観、実践、生活への影響を同じ観点で整理し、
          価値観との相性を考えるための比較カタログです。優劣や推薦ではなく、
          特徴理解に焦点を当てています。
        </p>
        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>掲載宗派</span>
            <strong className={styles.statValue}>{records.length}</strong>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>比較可能数</span>
            <strong className={styles.statValue}>最大4件</strong>
          </div>
          <div className={styles.stat}>
            <span className={styles.statLabel}>管理方式</span>
            <strong className={styles.statValue}>JSONベース</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>フィルタ</h2>
            <p className={styles.sectionText}>
              READMEで定義された代表条件で絞り込み、一覧と詳細を横断して確認できます。
            </p>
          </div>
          <button
            className={styles.buttonGhost}
            onClick={() => setFilters(defaultFilters)}
            type="button"
          >
            フィルタをリセット
          </button>
        </div>
        <div className={styles.filterGrid}>
          {selectOptions.map((option) => (
            <label className={styles.filterField} key={option.key}>
              <span className={styles.filterLabel}>{option.label}</span>
              <select
                className={styles.select}
                onChange={(event) =>
                  onFilterChange(
                    option.key,
                    event.target.value as FilterState[typeof option.key],
                  )
                }
                value={filters[option.key]}
              >
                {option.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>宗派一覧</h2>
            <p className={styles.sectionText}>
              {filteredRecords.length}件を表示中。カードから詳細表示でき、下部の比較表に同じ条件の宗派が並びます。
            </p>
          </div>
        </div>
        {filteredRecords.length > 0 ? (
          <div className={styles.cards}>
            {filteredRecords.map((record) => {
              return (
                <article className={styles.card} key={record.id}>
                  <div className={styles.cardTop}>
                    <div>
                      <p className={styles.eyebrow}>{record.religion}</p>
                      <h3 className={styles.cardTitle}>{record.sect}</h3>
                    </div>
                    <span className={styles.chip}>{record.deityType}</span>
                  </div>

                  <div className={styles.summary}>
                    <p>死後観: {joinList(record.afterlife)}</p>
                    <p>実践負荷: {record.practiceBurden}</p>
                    <p>飲酒: {record.alcohol}</p>
                    <p>主な地域: {joinList(record.distributionRegions)}</p>
                  </div>

                  <div className={styles.chipRow}>
                    {record.tags.slice(0, 4).map((tag) => (
                      <span className={styles.chip} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      className={styles.button}
                      onClick={() => setSelectedId(record.id)}
                      type="button"
                    >
                      詳細を見る
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            条件に一致する宗派がありません。フィルタ条件を緩めて再度確認してください。
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>フィルタ結果の比較</h2>
            <p className={styles.sectionText}>
              現在のフィルタ条件に一致した宗派を、主要特徴ごとに横並びで比較できます。
            </p>
          </div>
        </div>
        {filteredRecords.length > 0 ? (
          <div className={styles.compareTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>比較項目</th>
                  {filteredRecords.map((record) => (
                    <th key={record.id}>
                      {record.religion} / {record.sect}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={`filtered-${row.key}`}>
                    <th scope="row">{row.label}</th>
                    {filteredRecords.map((record) => (
                      <td key={`filtered-${row.key}-${record.id}`}>
                        {row.render(record)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            条件に一致する宗派がないため、比較表を表示できません。
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>詳細</h2>
            <p className={styles.sectionText}>
              概要、神観、教義、実践、生活への影響、フィルタ結果内での差分、出典を1画面で確認できます。
            </p>
          </div>
        </div>
        {selectedRecord ? (
          <div className={styles.detailGrid}>
            <div className={styles.detailStack}>
              <section className={styles.detailPanel}>
                <h3 className={styles.detailHeading}>1. 概要</h3>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>宗教名 / 宗派名</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.religion} / {selectedRecord.sect}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>成立時代・発祥</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.foundedEra} / {selectedRecord.originRegion}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>創始者・中心人物</span>
                    <p className={styles.detailValue}>{selectedRecord.founder}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>信者数・分布</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.followers} / {joinList(selectedRecord.distributionRegions)}
                    </p>
                  </div>
                </div>
              </section>

              <section className={styles.detailPanel}>
                <h3 className={styles.detailHeading}>2. 神観</h3>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>神タイプ</span>
                    <p className={styles.detailValue}>{selectedRecord.deityType}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>人格性・世界創造・救済者有無</span>
                    <p className={styles.detailValue}>
                      人格性: {boolLabel(selectedRecord.hasPersonhood, "あり", "なし")} /
                      世界創造: {boolLabel(selectedRecord.createdWorld, "あり", "なし")} /
                      救済者: {boolLabel(selectedRecord.hasSavior, "あり", "なし")}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>介入性・距離感</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.interventionLevel} / {selectedRecord.distanceToBelievers}
                    </p>
                  </div>
                </div>
              </section>

              <section className={styles.detailPanel}>
                <h3 className={styles.detailHeading}>3. 教義</h3>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>世界観</span>
                    <p className={styles.detailValue}>{selectedRecord.worldview}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>人間観・善悪観</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.humanView} {selectedRecord.goodEvilView}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>死後観・救済方法</span>
                    <p className={styles.detailValue}>
                      {joinList(selectedRecord.afterlife)} /{" "}
                      {joinList(selectedRecord.salvationMethods)}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>苦しみの原因・理想的生き方</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.causeOfSuffering} {selectedRecord.idealWayOfLife}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>禁忌</span>
                    <p className={styles.detailValue}>{joinList(selectedRecord.taboos)}</p>
                  </div>
                </div>
              </section>
            </div>

            <div className={styles.detailStack}>
              <section className={styles.detailPanel}>
                <h3 className={styles.detailHeading}>4. 実践</h3>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>礼拝頻度・祈り形式</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.worshipFrequency} / {selectedRecord.prayerStyle}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>瞑想・修行 / 断食</span>
                    <p className={styles.detailValue}>
                      {boolLabel(selectedRecord.hasMeditationPractice)} /{" "}
                      {boolLabel(selectedRecord.hasFasting)}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>寄付・儀式参加・聖典重視度</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.donationImportance} / {selectedRecord.ritualImportance} /{" "}
                      {selectedRecord.scriptureImportance}
                    </p>
                  </div>
                </div>
              </section>

              <section className={styles.detailPanel}>
                <h3 className={styles.detailHeading}>5. 生活への影響</h3>
                <div className={styles.detailList}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>食事制限・飲酒</span>
                    <p className={styles.detailValue}>
                      {joinList(selectedRecord.dietaryRestrictions)} / {selectedRecord.alcohol}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>結婚観・性倫理・服装規定</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.marriageView} {selectedRecord.sexualEthics}{" "}
                      {selectedRecord.dressCode}
                    </p>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>職業観・政治関係</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.workView} {selectedRecord.politicsRelation}
                    </p>
                  </div>
                </div>
              </section>

              <section className={styles.detailPanel}>
                <h3 className={styles.detailHeading}>6. 他宗派との違い</h3>
                {comparisonTarget ? (
                  <div className={styles.detailList}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>比較対象</span>
                      <p className={styles.detailValue}>
                        {comparisonTarget.religion} / {comparisonTarget.sect}
                        {filteredRecords.some((item) => item.id === comparisonTarget.id)
                          ? "（現在のフィルタ結果から選出）"
                          : "（近い宗派を自動選出）"}
                      </p>
                    </div>
                    {detailComparisons.map((item) => (
                      <div className={styles.detailItem} key={item.label}>
                        <span className={styles.detailLabel}>{item.label}</span>
                        <p className={styles.detailValue}>
                          {selectedRecord.sect}: {item.accessor(selectedRecord)}
                          <br />
                          {comparisonTarget.sect}: {item.accessor(comparisonTarget)}
                        </p>
                      </div>
                    ))}
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>特徴タグ</span>
                      <p className={styles.detailValue}>
                        {selectedRecord.sect}: {joinList(selectedRecord.tags)}
                        <br />
                        {comparisonTarget.sect}: {joinList(comparisonTarget.tags)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className={styles.detailValue}>比較対象がありません。</p>
                )}
              </section>

              <section className={styles.detailPanel}>
                <h3 className={styles.detailHeading}>7. 出典</h3>
                <div className={styles.detailList}>
                  {selectedRecord.sources.map((source) => (
                    <div className={styles.detailItem} key={source.title}>
                      <span className={styles.detailLabel}>{source.type}</span>
                      <p className={styles.detailValue}>{source.title}</p>
                    </div>
                  ))}
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>更新日・注意事項</span>
                    <p className={styles.detailValue}>
                      {selectedRecord.updatedAt} / {selectedRecord.notes}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>表示できる宗派データがありません。</div>
        )}
      </section>
    </div>
  )
}
