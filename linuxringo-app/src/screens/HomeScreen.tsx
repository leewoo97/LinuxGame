import { allProblems, problemsByTopic } from "../data/problems";
import ProgressBar from "../components/ProgressBar";
import "./HomeScreen.css";

const TOPICS = [
  { key: "touch", icon: "📄", label: "파일 생성", desc: "touch", color: "#58CC02", lightColor: "#D7FFB8" },
  { key: "mkdir", icon: "📁", label: "폴더 생성", desc: "mkdir", color: "#1CB0F6", lightColor: "#DDF4FF" },
  { key: "rm",    icon: "🗑️", label: "삭제",      desc: "rm",    color: "#FF4B4B", lightColor: "#FFE0E0" },
  { key: "cp",    icon: "📋", label: "복사",      desc: "cp",    color: "#FF9600", lightColor: "#FFF0CC" },
  { key: "mv",    icon: "✂️", label: "이동/이름", desc: "mv",    color: "#CE82FF", lightColor: "#F5E8FF" },
  { key: "ls",    icon: "🔍", label: "목록 조회", desc: "ls",    color: "#1CB0F6", lightColor: "#DDF4FF" },
];

interface Props {
  totalCompleted: number;
  onStart: (topic?: string) => void;
}

export default function HomeScreen({ totalCompleted, onStart }: Props) {
  const total = allProblems.length;
  const pct = total === 0 ? 0 : Math.round((totalCompleted / total) * 100);

  return (
    <div className="home">
      {/* Header */}
      <header className="home__header">
        <div className="home__logo">🐧</div>
        <h1 className="home__title">LinuxRingo</h1>
        <p className="home__sub">리눅스 명령어를 게임처럼 배워보세요</p>
      </header>

      {/* Stats row */}
      <div className="home__stats">
        <div className="home__stat home__stat--streak">
          <span className="home__stat-icon">🔥</span>
          <div>
            <div className="home__stat-value">1</div>
            <div className="home__stat-label">스트릭</div>
          </div>
        </div>
        <div className="home__stat home__stat--done">
          <span className="home__stat-icon">⭐</span>
          <div>
            <div className="home__stat-value">{totalCompleted}</div>
            <div className="home__stat-label">완료</div>
          </div>
        </div>
        <div className="home__stat home__stat--pct">
          <span className="home__stat-icon">📊</span>
          <div>
            <div className="home__stat-value">{pct}%</div>
            <div className="home__stat-label">달성률</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <section className="home__progress-section">
        <p className="home__progress-label">전체 진행률 ({totalCompleted} / {total})</p>
        <ProgressBar current={totalCompleted} total={total} />
      </section>

      {/* CTA */}
      <section className="home__cta">
        <button className="btn btn--primary btn--lg home__start-btn" onClick={() => onStart()}>
          오늘의 학습 시작 🚀
        </button>
      </section>

      {/* Topics */}
      <section className="home__topics">
        <h2 className="home__section-title">주제별 학습</h2>
        <div className="home__topic-grid">
          {TOPICS.map((t) => {
            const count = problemsByTopic[t.key]?.length ?? 0;
            return (
              <button
                key={t.key}
                className="topic-card"
                style={{ "--topic-color": t.color, "--topic-light": t.lightColor } as React.CSSProperties}
                onClick={() => onStart(t.key)}
              >
                <span className="topic-card__icon">{t.icon}</span>
                <span className="topic-card__label">{t.label}</span>
                <code className="topic-card__cmd">{t.desc}</code>
                <span className="topic-card__count">{count}문제</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
