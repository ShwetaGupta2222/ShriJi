
import type { FoodTag } from "./Models";

export function getEnumKeyFromValue<T extends Record<string,
    string>>(enumObject: T, value: string): keyof T | undefined {
    const entry = Object.entries(enumObject).find(([, val]) => val === value);
    return entry
        ? (entry[0] as keyof T)
        : undefined;
}

export function getValueFromEnumKey<T extends Record<string,
    string>>(enumObject: T, enumKey: string): keyof T | undefined {
    const entry = Object.entries(enumObject).find(([enu]) => enu === enumKey);
    return entry
        ? (entry[0] as keyof T)
        : undefined;
}

export const capitalizeFirstLetter = (str: string | undefined): string => {
    if (!str)
        return '';

    const lower = str.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
};

export function generateUniqueId(): string {
    return Date.now().toString() + Math
        .random()
        .toString(36)
        .substring(2, 9);
}

export function getFoodTagByName(tagName: string | undefined, foodTags: FoodTag[]): FoodTag | undefined {
    if (!foodTags || foodTags.length === 0 || !tagName) {
        return undefined;
    }
    return foodTags.find(tag => tag.name && tag.name.toLowerCase() === tagName.toLowerCase());
}

export const formatTime12Hour = (time24hr: string | null | undefined): string => {
    if (!time24hr || !/^\d{2}:\d{2}$/.test(time24hr)) {
        return "N/A";
    }
    const [hours, minutes] = time24hr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return "Invalid Time";
    }
    const ampm = hours >= 12
        ? 'PM'
        : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')
        } ${ampm}`;
};

const parseTimeToMinutes = (timeString: string): number => {
    if (!/^\d{2}:\d{2}$/.test(timeString)) {
        return -1;
    }
    const [hoursStr, minutesStr] = timeString.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return -1;
    }
    return hours * 60 + minutes;
};

export const checkAvailability = (availableFrom?: string, availableTo?: string): boolean => {
    if (!(availableFrom && availableTo))
        return true;

    const fromMinutes = parseTimeToMinutes(availableFrom);
    const toMinutes = parseTimeToMinutes(availableTo);
    if (fromMinutes === -1 || toMinutes === -1) {
        console.warn(`Invalid time format in availability range: From="${availableFrom}", To="${availableTo}"`);
        return true;
    }
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    if (availableFrom === "00:00" && availableTo === "23:59") {
        return true;
    }
    if (fromMinutes <= toMinutes) {
        return currentTotalMinutes >= fromMinutes && currentTotalMinutes <= toMinutes;
    } else {
        return currentTotalMinutes >= fromMinutes || currentTotalMinutes <= toMinutes;
    }
};

export const nextAvailabilityDay = (availableFrom?: string, availableTo?: string): string => {
    if (!(availableFrom && availableTo))
        return "";

    const fromMinutes = parseTimeToMinutes(availableFrom);
    const toMinutes = parseTimeToMinutes(availableTo);
    if (fromMinutes === -1 || toMinutes === -1) {
        console.warn(`Invalid time format in availability range: From="${availableFrom}", To="${availableTo}"`);
        return "";
    }
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;
    if (currentTotalMinutes < fromMinutes)
        return "Today";
    else
        return "Tomorrow";

};