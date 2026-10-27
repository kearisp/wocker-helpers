import {describe, it, expect} from "@jest/globals";
import {Volume} from "./Volume";


describe("Volume", () => {
    describe("parse", () => {
        it("should parse simple volume", () => {
            const volume = Volume.parse("/src:/dest");

            expect(volume.source).toBe("/src");
            expect(volume.destination).toBe("/dest");
            expect(volume.options).toBeUndefined();
        });

        it("should parse volume with options", () => {
            const volume = Volume.parse("/src:/dest:ro");

            expect(volume.source).toBe("/src");
            expect(volume.destination).toBe("/dest");
            expect(volume.options).toBe("ro");
        });

        it("should parse Windows drive path source", () => {
            const volume = Volume.parse("C:\\Users\\me\\data:/dest:ro");

            expect(volume.source).toBe("C:\\Users\\me\\data");
            expect(volume.destination).toBe("/dest");
            expect(volume.options).toBe("ro");
            expect(Volume.parse("C:/data:/dest").source).toBe("C:/data");
        });

        it("should treat a single-letter name as a named volume when no drive path fits", () => {
            const volume = Volume.parse("c:/data");

            expect(volume.source).toBe("c");
            expect(volume.destination).toBe("/data");
        });

        it("should throw error for invalid format", () => {
            expect(() => Volume.parse("invalid")).toThrow("Invalid volume format for volume \"invalid\"");
        });
    });

    describe("isValid", () => {
        it("should return true for valid volume", () => {
            expect(Volume.isValid("/src:/dest")).toBe(true);
        });

        it("should return true for valid volume with options", () => {
            expect(Volume.isValid("/src:/dest:ro")).toBe(true);
        });

        it("should return false for invalid volume", () => {
            expect(Volume.isValid("invalid")).toBe(false);
        });
    });

    describe("isHostPath", () => {
        it("should recognize absolute and relative paths", () => {
            expect(new Volume("/data", "/data").isHostPath()).toBe(true);
            expect(new Volume("./data", "/data").isHostPath()).toBe(true);
            expect(new Volume("../data", "/data").isHostPath()).toBe(true);
            expect(new Volume("~/data", "/data").isHostPath()).toBe(true);
        });

        it("should recognize Windows paths", () => {
            expect(new Volume("C:\\data", "/data").isHostPath()).toBe(true);
            expect(new Volume("c:/data", "/data").isHostPath()).toBe(true);
            expect(new Volume(".\\data", "/data").isHostPath()).toBe(true);
            expect(new Volume("\\\\server\\share", "/data").isHostPath()).toBe(true);
        });

        it("should not recognize named Docker volumes", () => {
            expect(new Volume("pgsql-data", "/data").isHostPath()).toBe(false);
            expect(new Volume("my_volume-1", "/data").isHostPath()).toBe(false);
        });
    });

    describe("toString", () => {
        it("should return correct string for simple volume", () => {
            const volume = new Volume("/src", "/dest");

            expect(volume.toString()).toBe("/src:/dest");
        });

        it("should return correct string for volume with options", () => {
            const volume = new Volume("/src", "/dest", "ro");

            expect(volume.toString()).toBe("/src:/dest:ro");
        });
    });
});
