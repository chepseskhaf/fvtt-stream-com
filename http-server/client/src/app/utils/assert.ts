
export function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new AssertionError(msg);
    }
}

export function assertNever(value: never, msg?: string): never {
    throw new AssertionError(msg);
}

class AssertionError extends Error {

    public constructor(msg?: string) {
        super(msg);
    }
}
