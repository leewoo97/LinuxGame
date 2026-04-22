# LinuxRingo — 제품 기획서

> 리눅스 명령어를 듀오링고처럼 배우는 블록 조합형 학습 앱

---

## 1. 제품 개요

### 앱 이름 (가칭)
**LinuxRingo** (Linux + Duolingo)

### 핵심 콘셉트
"이 Before 상태가 After 상태가 되려면 어떤 명령어가 필요할까?"

사용자는 파일/폴더 구조의 Before와 After를 보고,  
제공된 **블록**을 골라 올바른 리눅스 명령어를 **조합**한다.  
실제 터미널이나 가상 파일 시스템은 필요 없다.

### 목표 사용자
- 리눅스를 처음 배우는 개발자 입문자
- CS 전공생, 부트캠프 수강생
- 터미널이 두렵지만 체계적으로 배우고 싶은 사람
- 기존 CLI 지식을 가볍게 복습하고 싶은 개발자

### 제품 비전
> "5분씩, 매일, 습관처럼 리눅스를 익힌다."

---

## 2. MVP 범위

### ✅ MVP에 포함
| 기능 | 설명 |
|------|------|
| 문제 출제 | JSON 기반 문제 데이터에서 순차/랜덤 출제 |
| Before 구조 표시 | 트리 형태로 파일/폴더 Before 상태 표시 |
| 블록 선택 UI | 제공 블록을 탭/클릭으로 선택, 순서 조합 |
| 정답 판정 | 블록 배열과 acceptedAnswers 배열 비교 |
| After 구조 표시 | 정답 후 After 파일 구조 시각화 |
| 해설 표시 | 정답/오답 후 간단한 명령어 설명 |
| 학습 진행 표시 | 현재 문제 번호 / 전체 문제 수 표시 |
| 세션 완료 화면 | 한 세션(예: 5문제) 완료 시 결과 화면 |
| 로컬 진도 저장 | localStorage로 완료한 문제 ID 저장 |

### ❌ MVP에서 제외 (나중에 추가)
- 실제 터미널 실행 환경
- 사용자 계정/로그인
- 서버 백엔드, DB
- 스트릭, 경험치, 배지 시스템
- AI 기반 문제 생성
- 멀티플레이어 / 랭킹
- 와일드카드, 파이프, 리다이렉션 실행 검증

---

## 3. 핵심 화면 구성

### 화면 목록
```
1. 홈 화면 (HomeScreen)
2. 학습 선택 화면 (TopicSelectScreen)
3. 문제 화면 (QuizScreen)  ← 핵심
4. 정답/오답 피드백 화면 (FeedbackScreen)
5. 세션 완료 화면 (SessionCompleteScreen)
```

---

### 3-1. 홈 화면 (HomeScreen)

```
┌─────────────────────────────────┐
│         🐧 LinuxRingo           │
│   리눅스 명령어를 게임처럼 배우자   │
│                                 │
│  [오늘의 학습 시작하기]           │
│                                 │
│  📊 진행 현황                    │
│  완료한 문제: 12 / 60            │
│  ████████░░░░░░░  40%           │
│                                 │
│  📁 주제별 학습                  │
│  ├── 파일 조작 (rm, cp, mv)      │
│  ├── 디렉토리 관리 (mkdir, cd)   │
│  └── 파일 조회 (ls, cat)         │
└─────────────────────────────────┘
```

---

### 3-2. 학습 선택 화면 (TopicSelectScreen)

```
┌─────────────────────────────────┐
│  ← 주제 선택                     │
│                                 │
│  🟢 입문 (Beginner)              │
│  ├── [touch / mkdir] ✅완료      │
│  ├── [rm]  진행중                │
│  └── [cp / mv] 🔒잠김            │
│                                 │
│  🟡 초급 (Elementary)  🔒잠김    │
│  🔴 중급 (Intermediate) 🔒잠김  │
└─────────────────────────────────┘
```

---

### 3-3. 문제 화면 (QuizScreen) — 핵심 화면

```
┌─────────────────────────────────┐
│  ← 종료      3 / 5   ❤️❤️❤️     │
│  ▓▓▓▓▓▓░░░░░░░░░ 60%            │
├─────────────────────────────────┤
│                                 │
│  📁 현재 상태 (Before)           │
│  project/                       │
│  ├── app.js                     │
│  └── logs/                      │
│                                 │
├─────────────────────────────────┤
│                                 │
│  💬 logs 폴더를 삭제하세요.       │
│                                 │
├─────────────────────────────────┤
│                                 │
│  🖊️ 내 명령어                    │
│  ┌──────────────────────────┐   │
│  │  rm  │  -r  │  logs  │  │   │  ← 선택된 블록 (탭으로 제거 가능)
│  └──────────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│                                 │
│  🧩 사용 가능한 블록              │
│  ┌────┐ ┌────┐ ┌───────┐       │
│  │ rm │ │ -r │ │ logs  │       │
│  └────┘ └────┘ └───────┘       │
│  ┌───────┐ ┌───────┐ ┌──────┐  │
│  │ mkdir │ │ touch │ │app.js│  │
│  └───────┘ └───────┘ └──────┘  │
│                                 │
│          [제출하기]              │
└─────────────────────────────────┘
```

**UI 동작:**
- 블록 탭 → 하단 블록 팔레트에서 사라지고 상단 입력줄에 추가
- 입력줄의 블록 탭 → 다시 팔레트로 반환
- 블록은 드래그 없이 탭/클릭만으로 동작 (모바일 친화)

---

### 3-4. 피드백 화면 (FeedbackScreen)

**정답 시:**
```
┌─────────────────────────────────┐
│  ✅ 정답입니다!                   │
│                                 │
│  rm -r logs                     │
│                                 │
│  📁 After                       │
│  project/                       │
│  └── app.js                     │
│                                 │
│  💡 rm -r 는 디렉토리와 그 안의   │
│     모든 파일을 재귀적으로 삭제    │
│     합니다. -r 없이 rm만 쓰면     │
│     디렉토리는 삭제되지 않아요.   │
│                                 │
│          [다음 문제]             │
└─────────────────────────────────┘
```

**오답 시:**
```
┌─────────────────────────────────┐
│  ❌ 틀렸습니다                   │
│                                 │
│  내 답:  rm logs                │
│  정답:   rm -r logs             │
│                                 │
│  💡 디렉토리를 삭제하려면        │
│     -r (recursive) 옵션이 필요   │
│     합니다.                     │
│                                 │
│          [다음 문제]             │
└─────────────────────────────────┘
```

---

### 3-5. 세션 완료 화면 (SessionCompleteScreen)

```
┌─────────────────────────────────┐
│                                 │
│     🎉 세션 완료!                │
│                                 │
│     5문제 중 4개 정답            │
│     정확도: 80%                 │
│                                 │
│     오늘 배운 명령어             │
│     rm -r  /  mkdir -p  /  touch│
│                                 │
│   [다시 풀기]   [홈으로]         │
└─────────────────────────────────┘
```

---

## 4. 문제 데이터 구조

### 4-1. 핵심 스키마 (TypeScript 기준)

```typescript
// 파일/폴더 구조 표현 타입
type FileNode = "file" | { [name: string]: FileNode };
type FileTree = { [name: string]: FileNode };

// 문제 타입 구분
type ProblemType =
  | "filesystem"  // Before/After 파일 구조 변화
  | "output";     // 명령어 실행 결과(텍스트 출력) 맞히기

interface Problem {
  id: string;               // 고유 ID (예: "rm-folder-001")
  type: ProblemType;        // 문제 유형
  level: "beginner" | "elementary" | "intermediate" | "advanced";
  topic: string;            // 핵심 명령어 (예: "rm", "cp")
  tags: string[];           // 검색/분류용 태그 (예: ["directory", "delete"])

  instruction: string;      // 문제 설명 (한국어)
  hint?: string;            // 선택적 힌트

  // filesystem 유형 전용
  before?: FileTree;        // 실행 전 파일 구조
  after?: FileTree;         // 실행 후 파일 구조

  // output 유형 전용 (ls, pwd, cat 등)
  context?: FileTree;       // 현재 위치의 파일 구조
  currentPath?: string;     // 현재 경로 (예: "/home/user/project")
  expectedOutput?: string;  // 기대 출력 결과

  blocks: string[];         // 제공되는 블록 목록 (오답 유인 블록 포함)
  answer: string[];         // 대표 정답 블록 배열
  acceptedAnswers: string[][];  // 허용되는 모든 정답 배열

  explanation: string;      // 정답 해설
}
```

### 4-2. 문제 유형별 예시

**filesystem 유형** (Before → After 구조 변화):
```json
{
  "id": "rm-folder-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "rm",
  "tags": ["directory", "delete", "recursive"],
  "instruction": "logs 폴더를 삭제하세요.",
  "before": {
    "project": {
      "app.js": "file",
      "logs": {}
    }
  },
  "after": {
    "project": {
      "app.js": "file"
    }
  },
  "blocks": ["rm", "-r", "logs", "mkdir", "touch", "app.js"],
  "answer": ["rm", "-r", "logs"],
  "acceptedAnswers": [
    ["rm", "-r", "logs"],
    ["rm", "-R", "logs"],
    ["rm", "-rf", "logs"],
    ["rm", "-fr", "logs"]
  ],
  "explanation": "`rm -r logs`는 logs 폴더와 그 안의 내용을 재귀적으로 삭제합니다. 디렉토리를 삭제할 때는 반드시 `-r` 옵션이 필요합니다."
}
```

**output 유형** (ls, pwd, cat 등 출력 결과 맞히기):
```json
{
  "id": "ls-basic-001",
  "type": "output",
  "level": "beginner",
  "topic": "ls",
  "tags": ["list", "directory"],
  "instruction": "현재 디렉토리의 파일 목록을 출력하세요.",
  "context": {
    "project": {
      "app.js": "file",
      "README.md": "file",
      "src": {}
    }
  },
  "currentPath": "/home/user/project",
  "expectedOutput": "app.js  README.md  src",
  "blocks": ["ls", "pwd", "cat", "-l", "-a", "project"],
  "answer": ["ls"],
  "acceptedAnswers": [["ls"]],
  "explanation": "`ls`는 현재 디렉토리의 파일과 폴더 목록을 출력합니다."
}
```

---

## 5. 초급 예시 문제 20개

### 📂 SECTION 1: touch — 파일 생성 (4문제)

---

**문제 01** `touch-file-001`
```json
{
  "id": "touch-file-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "touch",
  "tags": ["create", "file"],
  "instruction": "project 폴더 안에 index.html 파일을 만드세요.",
  "before": {
    "project": {}
  },
  "after": {
    "project": {
      "index.html": "file"
    }
  },
  "blocks": ["touch", "mkdir", "index.html", "project", "-r"],
  "answer": ["touch", "project/index.html"],
  "acceptedAnswers": [
    ["touch", "project/index.html"]
  ],
  "explanation": "`touch 파일경로`는 빈 파일을 생성합니다. 폴더 안에 만들 때는 경로를 포함해 작성합니다."
}
```

---

**문제 02** `touch-file-002`
```json
{
  "id": "touch-file-002",
  "type": "filesystem",
  "level": "beginner",
  "topic": "touch",
  "tags": ["create", "file", "multiple"],
  "instruction": "현재 폴더에 a.txt, b.txt, c.txt 세 파일을 한 번에 만드세요.",
  "before": {},
  "after": {
    "a.txt": "file",
    "b.txt": "file",
    "c.txt": "file"
  },
  "blocks": ["touch", "a.txt", "b.txt", "c.txt", "mkdir", "-r"],
  "answer": ["touch", "a.txt", "b.txt", "c.txt"],
  "acceptedAnswers": [
    ["touch", "a.txt", "b.txt", "c.txt"]
  ],
  "explanation": "`touch`는 여러 파일 이름을 공백으로 나열하면 한 번에 여러 파일을 생성할 수 있습니다."
}
```

---

**문제 03** `touch-file-003`
```json
{
  "id": "touch-file-003",
  "type": "filesystem",
  "level": "beginner",
  "topic": "touch",
  "tags": ["create", "file"],
  "instruction": "현재 위치에 .gitignore 파일을 만드세요.",
  "before": {
    "src": {}
  },
  "after": {
    "src": {},
    ".gitignore": "file"
  },
  "blocks": ["touch", ".gitignore", "mkdir", "src", "-a"],
  "answer": ["touch", ".gitignore"],
  "acceptedAnswers": [["touch", ".gitignore"]],
  "explanation": "`touch .gitignore`처럼 점(.)으로 시작하는 이름도 파일로 만들 수 있습니다. 이런 파일은 숨김 파일이 됩니다."
}
```

---

**문제 04** `touch-file-004`
```json
{
  "id": "touch-file-004",
  "type": "filesystem",
  "level": "beginner",
  "topic": "touch",
  "tags": ["create", "file"],
  "instruction": "현재 폴더에 README.md 파일을 만드세요.",
  "before": {
    "src": {
      "main.js": "file"
    }
  },
  "after": {
    "src": {
      "main.js": "file"
    },
    "README.md": "file"
  },
  "blocks": ["touch", "README.md", "mkdir", "main.js", "src"],
  "answer": ["touch", "README.md"],
  "acceptedAnswers": [["touch", "README.md"]],
  "explanation": "`touch`는 존재하지 않는 파일을 새로 만들고, 이미 있는 파일이면 수정 시간만 갱신합니다."
}
```

---

### 📂 SECTION 2: mkdir — 디렉토리 생성 (3문제)

---

**문제 05** `mkdir-basic-001`
```json
{
  "id": "mkdir-basic-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "mkdir",
  "tags": ["create", "directory"],
  "instruction": "현재 위치에 logs 폴더를 만드세요.",
  "before": {
    "app.js": "file"
  },
  "after": {
    "app.js": "file",
    "logs": {}
  },
  "blocks": ["mkdir", "touch", "logs", "app.js", "-p"],
  "answer": ["mkdir", "logs"],
  "acceptedAnswers": [["mkdir", "logs"]],
  "explanation": "`mkdir 폴더명`은 새 디렉토리를 만듭니다."
}
```

---

**문제 06** `mkdir-nested-001`
```json
{
  "id": "mkdir-nested-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "mkdir",
  "tags": ["create", "directory", "nested"],
  "instruction": "src/components 폴더를 한 번에 만드세요. (src 폴더가 없어도 됩니다)",
  "before": {},
  "after": {
    "src": {
      "components": {}
    }
  },
  "blocks": ["mkdir", "-p", "-r", "src/components", "src", "components"],
  "answer": ["mkdir", "-p", "src/components"],
  "acceptedAnswers": [["mkdir", "-p", "src/components"]],
  "explanation": "`mkdir -p`는 중간 경로의 폴더가 없어도 한 번에 중첩 폴더를 만들어줍니다."
}
```

---

**문제 07** `mkdir-multiple-001`
```json
{
  "id": "mkdir-multiple-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "mkdir",
  "tags": ["create", "directory", "multiple"],
  "instruction": "현재 위치에 css, js, images 세 폴더를 한 번에 만드세요.",
  "before": {
    "index.html": "file"
  },
  "after": {
    "index.html": "file",
    "css": {},
    "js": {},
    "images": {}
  },
  "blocks": ["mkdir", "css", "js", "images", "touch", "-p", "index.html"],
  "answer": ["mkdir", "css", "js", "images"],
  "acceptedAnswers": [["mkdir", "css", "js", "images"]],
  "explanation": "`mkdir`도 `touch`처럼 여러 이름을 나열하면 한 번에 여러 폴더를 만들 수 있습니다."
}
```

---

### 📂 SECTION 3: rm — 파일/폴더 삭제 (3문제)

---

**문제 08** `rm-file-001`
```json
{
  "id": "rm-file-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "rm",
  "tags": ["delete", "file"],
  "instruction": "temp.txt 파일을 삭제하세요.",
  "before": {
    "temp.txt": "file",
    "main.js": "file"
  },
  "after": {
    "main.js": "file"
  },
  "blocks": ["rm", "temp.txt", "main.js", "-r", "-f", "touch"],
  "answer": ["rm", "temp.txt"],
  "acceptedAnswers": [
    ["rm", "temp.txt"],
    ["rm", "-f", "temp.txt"]
  ],
  "explanation": "`rm 파일명`은 파일을 삭제합니다. 파일에는 `-r` 옵션이 필요 없습니다."
}
```

---

**문제 09** `rm-folder-001`
```json
{
  "id": "rm-folder-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "rm",
  "tags": ["delete", "directory", "recursive"],
  "instruction": "logs 폴더를 삭제하세요.",
  "before": {
    "project": {
      "app.js": "file",
      "logs": {}
    }
  },
  "after": {
    "project": {
      "app.js": "file"
    }
  },
  "blocks": ["rm", "-r", "-f", "logs", "mkdir", "touch", "app.js"],
  "answer": ["rm", "-r", "logs"],
  "acceptedAnswers": [
    ["rm", "-r", "logs"],
    ["rm", "-R", "logs"],
    ["rm", "-rf", "logs"],
    ["rm", "-fr", "logs"]
  ],
  "explanation": "`rm -r`은 폴더와 그 안의 내용을 재귀적으로 삭제합니다. 폴더를 삭제하려면 반드시 `-r` 옵션이 필요합니다."
}
```

---

**문제 10** `rm-folder-002`
```json
{
  "id": "rm-folder-002",
  "type": "filesystem",
  "level": "beginner",
  "topic": "rm",
  "tags": ["delete", "directory", "recursive", "nested"],
  "instruction": "build 폴더(하위 파일 포함)를 강제 삭제하세요.",
  "before": {
    "src": {
      "index.js": "file"
    },
    "build": {
      "index.js": "file",
      "bundle.css": "file"
    }
  },
  "after": {
    "src": {
      "index.js": "file"
    }
  },
  "blocks": ["rm", "-r", "-f", "-rf", "build", "src", "touch", "mkdir"],
  "answer": ["rm", "-rf", "build"],
  "acceptedAnswers": [
    ["rm", "-rf", "build"],
    ["rm", "-r", "build"],
    ["rm", "-fr", "build"]
  ],
  "explanation": "`rm -rf`는 경고 없이 폴더와 내용을 강제 삭제합니다. 실제 환경에서는 매우 주의해서 사용해야 합니다."
}
```

---

### 📂 SECTION 4: cp — 파일/폴더 복사 (3문제)

---

**문제 11** `cp-file-001`
```json
{
  "id": "cp-file-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "cp",
  "tags": ["copy", "file"],
  "instruction": "app.js를 backup.js로 복사하세요.",
  "before": {
    "app.js": "file"
  },
  "after": {
    "app.js": "file",
    "backup.js": "file"
  },
  "blocks": ["cp", "mv", "app.js", "backup.js", "-r", "touch"],
  "answer": ["cp", "app.js", "backup.js"],
  "acceptedAnswers": [["cp", "app.js", "backup.js"]],
  "explanation": "`cp 원본 복사본`은 파일을 복사합니다. 원본은 그대로 남고 새 이름으로 복사본이 생성됩니다."
}
```

---

**문제 12** `cp-to-dir-001`
```json
{
  "id": "cp-to-dir-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "cp",
  "tags": ["copy", "file", "directory"],
  "instruction": "config.json을 backup 폴더 안으로 복사하세요.",
  "before": {
    "config.json": "file",
    "backup": {}
  },
  "after": {
    "config.json": "file",
    "backup": {
      "config.json": "file"
    }
  },
  "blocks": ["cp", "mv", "config.json", "backup", "backup/", "-r", "touch"],
  "answer": ["cp", "config.json", "backup/"],
  "acceptedAnswers": [
    ["cp", "config.json", "backup/"],
    ["cp", "config.json", "backup"]
  ],
  "explanation": "`cp 파일 폴더/`처럼 대상이 폴더이면 그 폴더 안으로 파일이 복사됩니다."
}
```

---

**문제 13** `cp-dir-001`
```json
{
  "id": "cp-dir-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "cp",
  "tags": ["copy", "directory", "recursive"],
  "instruction": "src 폴더 전체를 src_backup으로 복사하세요.",
  "before": {
    "src": {
      "index.js": "file",
      "utils.js": "file"
    }
  },
  "after": {
    "src": {
      "index.js": "file",
      "utils.js": "file"
    },
    "src_backup": {
      "index.js": "file",
      "utils.js": "file"
    }
  },
  "blocks": ["cp", "-r", "-R", "src", "src_backup", "mv", "touch"],
  "answer": ["cp", "-r", "src", "src_backup"],
  "acceptedAnswers": [
    ["cp", "-r", "src", "src_backup"],
    ["cp", "-R", "src", "src_backup"]
  ],
  "explanation": "폴더를 복사할 때는 `cp -r`처럼 재귀 옵션이 필요합니다. `-r` 없이는 폴더를 복사할 수 없습니다."
}
```

---

### 📂 SECTION 5: mv — 이동 / 이름 변경 (3문제)

---

**문제 14** `mv-rename-001`
```json
{
  "id": "mv-rename-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "mv",
  "tags": ["rename", "file"],
  "instruction": "old.txt의 이름을 new.txt로 바꾸세요.",
  "before": {
    "old.txt": "file",
    "main.js": "file"
  },
  "after": {
    "new.txt": "file",
    "main.js": "file"
  },
  "blocks": ["mv", "cp", "old.txt", "new.txt", "main.js", "-r"],
  "answer": ["mv", "old.txt", "new.txt"],
  "acceptedAnswers": [["mv", "old.txt", "new.txt"]],
  "explanation": "`mv`는 이동뿐 아니라 이름 변경에도 사용됩니다. 같은 위치에서 다른 이름으로 `mv`하면 이름이 바뀝니다."
}
```

---

**문제 15** `mv-move-001`
```json
{
  "id": "mv-move-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "mv",
  "tags": ["move", "file"],
  "instruction": "root의 report.pdf를 docs 폴더 안으로 이동하세요.",
  "before": {
    "report.pdf": "file",
    "docs": {}
  },
  "after": {
    "docs": {
      "report.pdf": "file"
    }
  },
  "blocks": ["mv", "cp", "report.pdf", "docs/", "docs", "-r", "touch"],
  "answer": ["mv", "report.pdf", "docs/"],
  "acceptedAnswers": [
    ["mv", "report.pdf", "docs/"],
    ["mv", "report.pdf", "docs"]
  ],
  "explanation": "`mv 파일 폴더/`는 파일을 해당 폴더로 이동시킵니다. `cp`와 달리 원본은 남지 않습니다."
}
```

---

**문제 16** `mv-rename-dir-001`
```json
{
  "id": "mv-rename-dir-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "mv",
  "tags": ["rename", "directory"],
  "instruction": "temp 폴더의 이름을 archive로 바꾸세요.",
  "before": {
    "src": {
      "index.js": "file"
    },
    "temp": {
      "log.txt": "file"
    }
  },
  "after": {
    "src": {
      "index.js": "file"
    },
    "archive": {
      "log.txt": "file"
    }
  },
  "blocks": ["mv", "cp", "-r", "temp", "archive", "src", "mkdir"],
  "answer": ["mv", "temp", "archive"],
  "acceptedAnswers": [["mv", "temp", "archive"]],
  "explanation": "`mv`로 폴더를 이름 변경할 때는 `-r` 옵션이 필요 없습니다. 폴더 자체를 이동하는 것이므로 그냥 `mv 원본 대상`으로 충분합니다."
}
```

---

### 📂 SECTION 6: ls — 목록 조회 (output 유형, 2문제)

---

**문제 17** `ls-basic-001`
```json
{
  "id": "ls-basic-001",
  "type": "output",
  "level": "beginner",
  "topic": "ls",
  "tags": ["list", "directory"],
  "instruction": "현재 디렉토리의 파일 목록을 확인하세요.",
  "context": {
    "app.js": "file",
    "README.md": "file",
    "node_modules": {}
  },
  "currentPath": "/home/user/project",
  "expectedOutput": "app.js  node_modules  README.md",
  "blocks": ["ls", "pwd", "cat", "-l", "-a", "app.js"],
  "answer": ["ls"],
  "acceptedAnswers": [["ls"]],
  "explanation": "`ls`는 현재 디렉토리의 파일과 폴더 목록을 출력합니다."
}
```

---

**문제 18** `ls-hidden-001`
```json
{
  "id": "ls-hidden-001",
  "type": "output",
  "level": "beginner",
  "topic": "ls",
  "tags": ["list", "hidden", "directory"],
  "instruction": "숨김 파일을 포함한 모든 파일 목록을 확인하세요.",
  "context": {
    "app.js": "file",
    ".env": "file",
    ".gitignore": "file"
  },
  "currentPath": "/home/user/project",
  "expectedOutput": ".  ..  .env  .gitignore  app.js",
  "blocks": ["ls", "-a", "-l", "-la", "pwd", "cat", ".env"],
  "answer": ["ls", "-a"],
  "acceptedAnswers": [
    ["ls", "-a"],
    ["ls", "-la"],
    ["ls", "-al"]
  ],
  "explanation": "`ls -a`는 점(.)으로 시작하는 숨김 파일도 포함하여 모든 파일을 출력합니다."
}
```

---

### 📂 SECTION 7: 복합 문제 (2문제)

---

**문제 19** `combo-mkdir-touch-001`
```json
{
  "id": "combo-mkdir-touch-001",
  "type": "filesystem",
  "level": "beginner",
  "topic": "mkdir",
  "tags": ["create", "directory", "file", "combo"],
  "instruction": "현재 폴더에 notes 폴더를 만드세요. 그리고 그 안에 today.txt 파일을 만드세요.\n(두 명령어가 필요합니다 — 첫 번째 명령어를 완성하세요)",
  "before": {},
  "after": {
    "notes": {}
  },
  "blocks": ["mkdir", "touch", "notes", "today.txt", "-p", "rm"],
  "answer": ["mkdir", "notes"],
  "acceptedAnswers": [["mkdir", "notes"]],
  "explanation": "폴더를 먼저 만든 후 그 안에 파일을 만드는 순서가 중요합니다. `mkdir notes`로 폴더를 먼저 생성합니다.",
  "nextProblemId": "combo-mkdir-touch-002"
}
```

---

**문제 20** `combo-mkdir-touch-002`
```json
{
  "id": "combo-mkdir-touch-002",
  "type": "filesystem",
  "level": "beginner",
  "topic": "touch",
  "tags": ["create", "file", "combo"],
  "instruction": "방금 만든 notes 폴더 안에 today.txt 파일을 만드세요.",
  "before": {
    "notes": {}
  },
  "after": {
    "notes": {
      "today.txt": "file"
    }
  },
  "blocks": ["touch", "mkdir", "notes/today.txt", "today.txt", "notes", "-p"],
  "answer": ["touch", "notes/today.txt"],
  "acceptedAnswers": [["touch", "notes/today.txt"]],
  "explanation": "`touch notes/today.txt`처럼 경로를 포함해서 하위 폴더 안에 파일을 만들 수 있습니다."
}
```

---

## 6. 블록 조합 UI 동작 방식

### 6-1. 전체 구조

```
[입력 영역]   → 사용자가 선택한 블록들이 순서대로 표시되는 곳
[블록 팔레트] → 선택 가능한 블록들이 나열된 곳
[제출 버튼]   → 현재 입력 영역의 블록 배열로 정답 판정 요청
```

### 6-2. 인터랙션 규칙

| 동작 | 결과 |
|------|------|
| 팔레트에서 블록 탭 | 블록이 팔레트에서 사라지고 입력 영역 오른쪽 끝에 추가 |
| 입력 영역의 블록 탭 | 블록이 입력 영역에서 제거되고 팔레트로 반환 |
| 블록 드래그 (옵션) | 입력 영역 내 블록 순서 변경 가능 |
| 전체 지우기 버튼 | 입력 영역 모든 블록을 팔레트로 반환 |

### 6-3. 블록 설계 원칙

```
블록 종류:
- 명령어 블록:  [rm]  [cp]  [mv]  [mkdir]  [touch]  [ls]
- 옵션 블록:   [-r]  [-f]  [-rf]  [-a]  [-l]  [-p]
- 경로/파일명: [logs] [app.js] [src/] [backup/]
- 유인 블록:   정답에 필요 없지만 헷갈릴 수 있는 블록 포함

블록 수:
- 정답 블록 수 + 유인 블록 2~4개 (난이도에 따라 조정)
- 너무 많으면 혼란스럽고, 너무 적으면 너무 쉬움
```

### 6-4. 블록 시각 디자인 권고

```
명령어 블록: 파란 배경 (primary)
옵션 블록:   주황 배경 (warning)  — 옵션임을 시각적으로 구분
경로/파일명: 회색 배경 (neutral)
유인 블록:   외관은 동일 — 내용으로만 구분

선택된 블록: 테두리 강조 + 입력 영역에 표시
```

---

## 7. 정답 판정 로직

### 7-1. 기본 판정 (MVP)

```typescript
function judgeAnswer(
  userBlocks: string[],
  acceptedAnswers: string[][]
): boolean {
  return acceptedAnswers.some(
    (accepted) =>
      accepted.length === userBlocks.length &&
      accepted.every((block, i) => block === userBlocks[i])
  );
}
```

**예시:**
```
userBlocks     = ["rm", "-r", "logs"]
acceptedAnswers = [["rm", "-r", "logs"], ["rm", "-rf", "logs"], ...]

→ 첫 번째 배열과 완전히 일치 → ✅ 정답
```

### 7-2. 정규화 판정 (확장)

```typescript
// 옵션 순서 무관하게 허용 (예: rm -r -f == rm -f -r)
function normalizeCommand(blocks: string[]): string {
  if (blocks.length === 0) return "";
  const command = blocks[0];
  const options = blocks.slice(1).filter(b => b.startsWith("-")).sort();
  const args = blocks.slice(1).filter(b => !b.startsWith("-"));
  return [command, ...options, ...args].join(" ");
}

function judgeAnswerNormalized(
  userBlocks: string[],
  acceptedAnswers: string[][]
): boolean {
  const userNorm = normalizeCommand(userBlocks);
  return acceptedAnswers.some(
    (accepted) => normalizeCommand(accepted) === userNorm
  );
}
```

### 7-3. 부분 힌트 판정 (오답일 때 도움말용)

```typescript
function getPartialFeedback(
  userBlocks: string[],
  answer: string[]
): string {
  if (userBlocks[0] !== answer[0]) {
    return `명령어가 틀렸어요. 힌트: ${answer[0]} 명령어를 사용해보세요.`;
  }
  if (userBlocks.length < answer.length) {
    return "옵션이 빠진 것 같아요. 더 추가해보세요.";
  }
  if (userBlocks.length > answer.length) {
    return "불필요한 블록이 포함된 것 같아요.";
  }
  return "순서나 블록을 다시 확인해보세요.";
}
```

### 7-4. 판정 흐름 다이어그램

```
사용자가 [제출] 클릭
       ↓
userBlocks 배열 수집
       ↓
빈 배열이면 → "블록을 선택해주세요" 경고
       ↓
judgeAnswer(userBlocks, acceptedAnswers) 실행
       ↓
true → 정답 처리:          false → 오답 처리:
  - 정답 애니메이션           - 오답 애니메이션
  - After 구조 표시           - 정답 표시
  - 해설 표시                 - 부분 힌트 표시
  - 오답 횟수 초기화           - 오답 횟수 +1
  - 다음 문제 버튼             - 재시도 or 다음 문제 버튼
```

---

## 8. 확장 기능 로드맵

### Phase 2 — 학습 경험 강화

| 기능 | 설명 |
|------|------|
| ❤️ 생명력 시스템 | 틀리면 하트 감소, 0이 되면 세션 종료 |
| 🔥 스트릭 | 매일 학습 시 연속일 수 표시 |
| ⭐ XP / 레벨 | 문제 풀면 경험치 획득, 레벨업 |
| 🏅 배지 | "rm 마스터", "7일 연속 학습" 등 |
| 📊 복습 큐 | 틀린 문제를 주기적으로 다시 출제 (스페이스드 리피티션) |

### Phase 3 — 문제 확장

| 명령어 주제 | 설명 |
|------------|------|
| chmod / chown | 파일 권한 변경 |
| grep | 파일 내 문자열 검색 |
| find | 조건으로 파일 찾기 |
| cat / echo | 파일 내용 조회 / 생성 |
| pipe ( `|` ) | 명령어 조합 |
| redirect ( `>`, `>>` ) | 출력 리다이렉션 |
| 와일드카드 ( `*`, `?` ) | 패턴 매칭 |
| tar / gzip | 압축 / 해제 |

### Phase 4 — 소셜 / 백엔드

| 기능 | 설명 |
|------|------|
| 🔐 계정 / 로그인 | Google, GitHub OAuth |
| ☁️ 진도 클라우드 동기화 | 기기 간 진도 공유 |
| 🏆 랭킹 / 리더보드 | 주간 문제 풀이 수 랭킹 |
| 👥 커뮤니티 문제 | 사용자가 문제를 직접 제출 |
| 🤖 AI 문제 생성 | LLM으로 새로운 문제 자동 생성 |

### Phase 5 — 고급 판정

| 기능 | 설명 |
|------|------|
| 시맨틱 정답 판정 | `rm -r -f` == `rm -rf` 등 의미적 동치 허용 |
| 실제 명령어 실행 검증 | WebAssembly + 가상 FS로 실제 실행 결과 비교 |
| 힌트 시스템 | n회 틀리면 블록 위치 힌트 제공 |

---

## 9. 컴포넌트 구조 (React 기준)

### 9-1. 디렉토리 구조

```
src/
├── data/
│   └── problems/
│       ├── touch.ts          # touch 관련 문제 모음
│       ├── mkdir.ts
│       ├── rm.ts
│       ├── cp.ts
│       ├── mv.ts
│       └── ls.ts
│
├── types/
│   └── problem.ts            # Problem, FileTree 타입 정의
│
├── utils/
│   ├── judgeAnswer.ts        # 정답 판정 로직
│   ├── renderFileTree.ts     # FileTree → 트리 문자열 변환
│   └── shuffleBlocks.ts      # 블록 순서 랜덤 셔플
│
├── hooks/
│   ├── useQuizSession.ts     # 세션 상태 관리 (문제 목록, 현재 인덱스)
│   ├── useBlockInput.ts      # 블록 선택/제거 상태 관리
│   └── useProgress.ts        # localStorage 진도 관리
│
├── components/
│   ├── layout/
│   │   └── AppShell.tsx      # 헤더 + 진행 바 레이아웃
│   │
│   ├── home/
│   │   ├── HomeScreen.tsx
│   │   └── TopicCard.tsx
│   │
│   ├── quiz/
│   │   ├── QuizScreen.tsx            # 문제 화면 메인
│   │   ├── FileTreeView.tsx          # Before/After 파일 구조 시각화
│   │   ├── InstructionBox.tsx        # 문제 설명 텍스트
│   │   ├── CommandInput.tsx          # 선택된 블록 표시 영역
│   │   ├── BlockPalette.tsx          # 선택 가능한 블록 팔레트
│   │   ├── Block.tsx                 # 개별 블록 컴포넌트
│   │   └── SubmitButton.tsx
│   │
│   ├── feedback/
│   │   ├── FeedbackScreen.tsx        # 정답/오답 피드백 화면
│   │   ├── AnswerReveal.tsx          # 정답 표시
│   │   ├── AfterTreeView.tsx         # After 파일 구조 표시
│   │   └── ExplanationBox.tsx        # 해설 텍스트
│   │
│   └── session/
│       └── SessionCompleteScreen.tsx
│
└── App.tsx                   # 라우팅 (화면 전환 상태 관리)
```

### 9-2. 핵심 컴포넌트 Props

```typescript
// Block.tsx
interface BlockProps {
  text: string;
  variant: "command" | "option" | "path";
  location: "palette" | "input";
  onClick: () => void;
}

// FileTreeView.tsx
interface FileTreeViewProps {
  tree: FileTree;
  rootName?: string;   // 예: "project"
  label?: string;      // "Before" | "After"
  highlight?: string[]; // 변경된 파일/폴더 강조
}

// QuizScreen.tsx
interface QuizScreenProps {
  problem: Problem;
  onSubmit: (userBlocks: string[]) => void;
}

// FeedbackScreen.tsx
interface FeedbackScreenProps {
  isCorrect: boolean;
  problem: Problem;
  userAnswer: string[];
  onNext: () => void;
}

// useBlockInput.ts (hook)
function useBlockInput(initialBlocks: string[]) {
  // returns:
  // paletteBlocks: string[]   — 팔레트에 남은 블록
  // inputBlocks: string[]     — 입력 영역의 블록
  // selectBlock(text): void   — 팔레트 → 입력
  // removeBlock(index): void  — 입력 → 팔레트
  // resetBlocks(): void       — 전체 초기화
}
```

### 9-3. 상태 흐름

```
App.tsx
  └─ screen: "home" | "topic" | "quiz" | "feedback" | "complete"
       │
       ├─ [home] → HomeScreen → 학습 시작 → [quiz]
       │
       ├─ [quiz] → QuizScreen
       │               └─ useQuizSession: 문제 목록, 현재 인덱스
       │               └─ useBlockInput: 블록 선택 상태
       │               └─ 제출 → judgeAnswer() → [feedback]
       │
       ├─ [feedback] → FeedbackScreen
       │               └─ 다음 문제 클릭
       │                    ├─ 문제 남음 → [quiz] (다음 문제)
       │                    └─ 세션 끝  → [complete]
       │
       └─ [complete] → SessionCompleteScreen
```

### 9-4. Flutter 기준 컴포넌트 구조 (참고)

```
lib/
├── models/
│   ├── problem.dart
│   └── file_tree.dart
│
├── data/
│   └── problems/
│       ├── touch_problems.dart
│       ├── rm_problems.dart
│       └── ...
│
├── providers/         (Riverpod 또는 Provider 사용)
│   ├── quiz_provider.dart
│   └── block_input_provider.dart
│
├── screens/
│   ├── home_screen.dart
│   ├── quiz_screen.dart
│   ├── feedback_screen.dart
│   └── session_complete_screen.dart
│
├── widgets/
│   ├── file_tree_view.dart
│   ├── block_chip.dart          # 개별 블록 위젯
│   ├── block_palette.dart
│   ├── command_input_row.dart
│   └── explanation_card.dart
│
└── utils/
    ├── judge_answer.dart
    └── render_tree.dart
```

---

## 10. FileTree 렌더링 유틸리티

### renderFileTree 함수 (TypeScript)

```typescript
type FileTree = { [key: string]: "file" | FileTree };

function renderFileTree(
  tree: FileTree,
  rootName: string = ".",
  prefix: string = ""
): string {
  const lines: string[] = [`${rootName}/`];
  const entries = Object.entries(tree);

  entries.forEach(([name, value], index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = isLast ? "    " : "│   ";

    if (value === "file") {
      lines.push(`${prefix}${connector}${name}`);
    } else {
      lines.push(`${prefix}${connector}${name}/`);
      const subTree = renderFileTree(value, "", prefix + childPrefix);
      // 첫 줄(루트) 제외하고 추가
      subTree.split("\n").slice(1).forEach(line => {
        if (line) lines.push(line);
      });
    }
  });

  return lines.join("\n");
}

// 사용 예:
const tree = {
  "app.js": "file",
  "logs": {
    "error.log": "file"
  }
};

console.log(renderFileTree(tree, "project"));
// project/
// ├── app.js
// └── logs/
//     └── error.log
```

---

## 부록: 개발 우선순위 체크리스트

### Sprint 1 (핵심 MVP)
- [ ] Problem 타입 정의 (`types/problem.ts`)
- [ ] 문제 데이터 20개 작성 (`data/problems/`)
- [ ] `judgeAnswer()` 함수 구현 및 테스트
- [ ] `renderFileTree()` 함수 구현
- [ ] `useBlockInput` 훅 구현
- [ ] `BlockPalette` + `Block` 컴포넌트 구현
- [ ] `CommandInput` (입력 영역) 컴포넌트 구현
- [ ] `FileTreeView` 컴포넌트 구현
- [ ] `QuizScreen` 메인 화면 조립
- [ ] `FeedbackScreen` 구현

### Sprint 2 (완성도)
- [ ] `HomeScreen` 구현
- [ ] `SessionCompleteScreen` 구현
- [ ] `useProgress` (localStorage) 구현
- [ ] 진행 바, 문제 번호 표시
- [ ] 블록 셔플 (매번 다른 순서)
- [ ] 애니메이션 (정답/오답 피드백)

### Sprint 3 (품질)
- [ ] 문제 40개 이상으로 확장
- [ ] 반응형 디자인 (모바일 최적화)
- [ ] 접근성 (키보드 탐색)
- [ ] 정규화 판정 로직 추가
