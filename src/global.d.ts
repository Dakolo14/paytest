// src/global.d.ts
declare class NDEFReader {
    constructor();
    scan(): Promise<void>;
    write(message: string | NDEFMessage): Promise<void>;
    addEventListener(type: 'reading', listener: (event: NDEFReadingEvent) => void): void;
    addEventListener(type: 'error', listener: (event: Event) => void): void;
}

interface NDEFReadingEvent extends Event {
    serialNumber: string;
    message: NDEFMessage;
}

interface NDEFMessage {
    records: NDEFRecord[];
}

interface NDEFRecord {
    recordType: string;
    mediaType?: string;
    id?: string;
    data?: ArrayBuffer;
}
