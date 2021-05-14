export const baseShade = 230;

export const getButtonRGB = (count: number, threshold: number) => {
    const strength = threshold - count;
    const percentage = strength > 0 ? strength / threshold : 0;
    const RBshade = baseShade * percentage
    return [
        RBshade,
        baseShade,
        RBshade
    ]
}