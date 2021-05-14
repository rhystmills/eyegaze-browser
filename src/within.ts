type Position = {
    x: number,
    y: number
}

export const within = (position: Position, element: Element) => {
    const box = element.getBoundingClientRect()
    if (position.x < box.right && 
        position.x > box.left && 
        position.y > box.top &&
        position.y < box.bottom){
        return true
    }
    return false
}