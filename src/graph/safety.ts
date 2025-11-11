export function safetyCheck(planStepDetail: string) {
  // deny dangerous ops; here we just block words like "delete", "rm -rf"
  const banned = [/rm -rf/, /delete\s+system/i];
  if (banned.some(rx => rx.test(planStepDetail))) {
    return { allowed: false, reason: "dangerous operation" };
  }
  return { allowed: true };
}
