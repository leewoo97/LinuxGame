export function judgeAnswer(
  userBlocks: string[],
  acceptedAnswers: string[][]
): boolean {
  return acceptedAnswers.some(
    (accepted) =>
      accepted.length === userBlocks.length &&
      accepted.every((block, i) => block === userBlocks[i])
  );
}

export function getPartialFeedback(
  userBlocks: string[],
  answer: string[]
): string {
  if (userBlocks.length === 0) return "블록을 선택해주세요.";
  if (userBlocks[0] !== answer[0])
    return `명령어가 틀렸어요. 힌트: '${answer[0]}' 명령어를 사용해보세요.`;
  if (userBlocks.length < answer.length)
    return "옵션이나 인자가 빠진 것 같아요. 더 추가해보세요.";
  if (userBlocks.length > answer.length)
    return "불필요한 블록이 포함된 것 같아요.";
  return "순서나 블록을 다시 확인해보세요.";
}
