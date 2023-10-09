export interface IPlatforms {
    name: string;
    image: string;
    disabled?: boolean;
}

export interface IPlatformsProps {
    selectedPlatform: number;
    onSelect: (index: number) => void;
    data: IPlatforms[];
}