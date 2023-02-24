import { vi } from "vitest";

export const QueriesWords = vi.fn();
QueriesWords.prototype.addWords = vi.fn();
QueriesWords.prototype.renameWords = vi.fn();
QueriesWords.prototype.removeWords = vi.fn();
