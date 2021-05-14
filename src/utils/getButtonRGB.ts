export const baseShade = 230;
const max = 255;

export const getButtonRGB = (count: number, threshold: number) => {
    const strength = threshold - count;
    const percentage = strength > 0 ? strength / threshold : 0;
    const RBshade = baseShade * percentage
    console.log({
        r: RBshade,
        g: baseShade,
        b: RBshade
    })
    return [
        RBshade,
        baseShade,
        RBshade
    ]
}