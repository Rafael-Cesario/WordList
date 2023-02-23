import { vi } from "vitest";

export const QueriesWordList = vi.fn();
QueriesWordList.prototype.createWordList = vi.fn();
QueriesWordList.prototype.changeWordListStatus = vi.fn();
QueriesWordList.prototype.deleteWordList = vi.fn();
