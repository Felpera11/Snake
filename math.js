/**but did it tho */
function hitWall(n, size, maxW, maxH) {
    clamped = new vector2(n.x, n.y);

    if (n.x < 0) {
        return true
    }
    if (n.x + size > maxW) {
        return true;
    }
    if (n.y < 0) {
        return true;
    }
    if (n.y + size > maxH) {
        return true;
    }
    return false;
}

/**Vector with x and y values */
class vector2
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }

    add(vec2)
    {
        return new vector2(
        this.x += vec2.x,
        this.y += vec2.y);
    }
    subtract(vec2)
    {
        return new vector2(
            this.x -= vec2.x,
            this.y -= vec2.y);
    }
    equals(vec2)
    {
        return this.x == vec2.x && this.y == vec2.y;
    }
    clone()
    {
        return new vector2(this.x, this.y);
    }
}