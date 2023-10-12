export default function stringToTags(string: string): string[] {
    return string.split(',').map(tag => tag.trim())
}