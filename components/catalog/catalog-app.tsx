"use client"

import Link from "next/link"
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

export const CatalogApp = ({ records }: CatalogAppProps) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

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

  const onFilterChange = <Key extends keyof FilterState>(
    key: Key,
    value: FilterState[Key],
  ) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Find what to believe</p>
        <h1 className={styles.heroTitle}>気になる価値観から、信じるものを見つける</h1>
        <p className={styles.heroText}>
          いきなりむずかしい教義を読むのではなく、
          暮らし方や大事にしたい価値観から、気になる宗教や宗派を気軽に見比べられます。
          ここでは優劣ではなく、自分にとっての理解しやすさを大切にしています。
        </p>
        <div className={styles.heroHighlights}>
          <span className={styles.heroPill}>暮らしに近い視点でチェック</span>
          <span className={styles.heroPill}>気になる条件ですぐ比較</span>
          <span className={styles.heroPill}>はじめてでも読みやすい</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>フィルタ</h2>
            <p className={styles.sectionText}>
              まずは気になる条件を選ぶだけで、雰囲気の近い宗派をすばやく見つけられます。
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
              {filteredRecords.length}件を表示中。気になる宗派から詳細を開き、同じ条件の違いをそのまま比べられます。
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
                    <Link className={styles.buttonGhost} href={`/religions/${record.id}/`}>
                      詳細
                    </Link>
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

    </div>
  )
}
