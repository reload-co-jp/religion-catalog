import styles from "components/catalog/catalog-app.module.css"
import type { ReligionRecord } from "lib/religion"

type ReligionDetailProps = {
  record: ReligionRecord
}

function boolLabel(value: boolean, truthy = "あり", falsy = "なし") {
  return value ? truthy : falsy
}

function joinList(values: string[]) {
  return values.length > 0 ? values.join(" / ") : "特記事項なし"
}

export const ReligionDetail = ({ record }: ReligionDetailProps) => {
  const historySummary = `${record.foundedEra}に${record.originRegion}で形成され、${record.founder}が重要な起点として語られます。${record.notes}`

  return (
    <div className={styles.detailGrid}>
      <div className={styles.detailStack}>
        <section className={styles.detailPanel}>
          <h3 className={styles.detailHeading}>1. 概要</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>宗教名 / 宗派名</span>
              <p className={styles.detailValue}>
                {record.religion} / {record.sect}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>成立時代・発祥</span>
              <p className={styles.detailValue}>
                {record.foundedEra} / {record.originRegion}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>創始者・中心人物</span>
              <p className={styles.detailValue}>{record.founder}</p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>信者数・分布</span>
              <p className={styles.detailValue}>
                {record.followers} / {joinList(record.distributionRegions)}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.detailPanel}>
          <h3 className={styles.detailHeading}>2. 歴史・誕生経緯</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>成立の背景</span>
              <p className={styles.detailValue}>{historySummary}</p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>広がった地域</span>
              <p className={styles.detailValue}>
                {joinList(record.distributionRegions)}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.detailPanel}>
          <h3 className={styles.detailHeading}>3. 神観</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>神タイプ</span>
              <p className={styles.detailValue}>{record.deityType}</p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>人格性・世界創造・救済者有無</span>
              <p className={styles.detailValue}>
                人格性: {boolLabel(record.hasPersonhood, "あり", "なし")} / 世界創造:{" "}
                {boolLabel(record.createdWorld, "あり", "なし")} / 救済者:{" "}
                {boolLabel(record.hasSavior, "あり", "なし")}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>介入性・距離感</span>
              <p className={styles.detailValue}>
                {record.interventionLevel} / {record.distanceToBelievers}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.detailPanel}>
          <h3 className={styles.detailHeading}>4. 教義</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>世界観</span>
              <p className={styles.detailValue}>{record.worldview}</p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>人間観・善悪観</span>
              <p className={styles.detailValue}>
                {record.humanView} {record.goodEvilView}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>死後観・救済方法</span>
              <p className={styles.detailValue}>
                {joinList(record.afterlife)} / {joinList(record.salvationMethods)}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>苦しみの原因・理想的生き方</span>
              <p className={styles.detailValue}>
                {record.causeOfSuffering} {record.idealWayOfLife}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>禁忌</span>
              <p className={styles.detailValue}>{joinList(record.taboos)}</p>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.detailStack}>
        <section className={styles.detailPanel}>
          <h3 className={styles.detailHeading}>5. 実践</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>礼拝頻度・祈り形式</span>
              <p className={styles.detailValue}>
                {record.worshipFrequency} / {record.prayerStyle}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>瞑想・修行 / 断食</span>
              <p className={styles.detailValue}>
                {boolLabel(record.hasMeditationPractice)} /{" "}
                {boolLabel(record.hasFasting)}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>寄付・儀式参加・聖典重視度</span>
              <p className={styles.detailValue}>
                {record.donationImportance} / {record.ritualImportance} /{" "}
                {record.scriptureImportance}
              </p>
            </div>
          </div>
        </section>

        <section className={styles.detailPanel}>
          <h3 className={styles.detailHeading}>6. 生活への影響</h3>
          <div className={styles.detailList}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>食事制限・飲酒</span>
              <p className={styles.detailValue}>
                {joinList(record.dietaryRestrictions)} / {record.alcohol}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>結婚観・性倫理・服装規定</span>
              <p className={styles.detailValue}>
                {record.marriageView} {record.sexualEthics} {record.dressCode}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>結婚観タグ</span>
              <div className={styles.chipRow}>
                {record.marriageTags.length > 0 ? (
                  record.marriageTags.map((tag) => (
                    <span className={styles.chip} key={tag}>
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className={styles.detailValue}>特記事項なし</p>
                )}
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>職業観・政治関係</span>
              <p className={styles.detailValue}>
                {record.workView} {record.politicsRelation}
              </p>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>職業観タグ</span>
              <div className={styles.chipRow}>
                {record.workTags.length > 0 ? (
                  record.workTags.map((tag) => (
                    <span className={styles.chip} key={tag}>
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className={styles.detailValue}>特記事項なし</p>
                )}
              </div>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>服装規定タグ</span>
              <div className={styles.chipRow}>
                {record.dressTags.length > 0 ? (
                  record.dressTags.map((tag) => (
                    <span className={styles.chip} key={tag}>
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className={styles.detailValue}>特記事項なし</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailPanel}>
          <h3 className={styles.detailHeading}>7. 出典</h3>
          <div className={styles.detailList}>
            {record.sources.map((source) => (
              <div className={styles.detailItem} key={source.title}>
                <span className={styles.detailLabel}>{source.type}</span>
                <p className={styles.detailValue}>{source.title}</p>
              </div>
            ))}
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>更新日・注意事項</span>
              <p className={styles.detailValue}>
                {record.updatedAt} / {record.notes}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
