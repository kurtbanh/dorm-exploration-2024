let currentWall = 1;  // Track which wall is currently displayed
let description;  // Description div
let walls = [[], [], [], []];  // Array to store items for each wall

class Shape {
    constructor(x, y, w, h, color, borderRadius = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        this.borderRadius = borderRadius;
    }

    draw() {
        // To be implemented by subclasses
    }

    isHovered(mx, my) {
        // To be implemented by subclasses
    }
}

class Rectangle extends Shape {
    constructor(x, y, w, h, color, borderRadius = 0, borderColor = null, borderWidth = 0) {
        super(x, y, w, h, color, borderRadius);
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
    }

    draw() {
        if (this.borderColor) {
            stroke(this.borderColor);
            strokeWeight(this.borderWidth);
        } else {
            noStroke();
        }
        fill(this.color);
        rect(this.x, this.y, this.w, this.h, this.borderRadius);
    }

    isHovered(mx, my) {
        return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h;
    }
}

class Ellipse extends Shape {
    constructor(x, y, w, h, color, borderColor = null, borderWidth = 0) {
        super(x, y, w, h, color);
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
    }

    draw() {
        if (this.borderColor) {
            stroke(this.borderColor);
            strokeWeight(this.borderWidth);
        } else {
            noStroke();
        }
        fill(this.color);
        ellipse(this.x, this.y, this.w, this.h);
    }

    isHovered(mx, my) {
        return dist(mx, my, this.x, this.y) < this.w / 2;
    }
}

class Item {
    constructor(desc) {
        this.shapes = [];
        this.desc = desc;
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    draw() {
        for (let shape of this.shapes) {
            shape.draw();
        }
    }

    isHovered(mx, my) {
        for (let shape of this.shapes) {
            if (shape.isHovered(mx, my)) {
                return true;
            }
        }
        return false;
    }
}

function setup() {
    // Create a canvas that scales based on the size of the sketch container
    let container = document.getElementById('sketch-container');
    let canvas = createCanvas(container.clientWidth, container.clientHeight);  // Dynamic size canvas
    canvas.parent('sketch-container');
    
    description = document.getElementById('description');  // Get the description div
    
    // Initialize items for Wall 1
    let item1 = new Item("Item 1: A simple door.");
    item1.addShape(new Rectangle(272, 325, 83, 105, '#D6B794'));
    item1.addShape(new Rectangle(280, 333, 66, 23, '#AA8862'));
    item1.addShape(new Rectangle(280, 362, 66, 61, '#AA8862'));
    walls[0].push(item1);

    let item2 = new Item("Item 2: A red poster.");
    item2.addShape(new Rectangle(133, 325, 139, 105, '#AD8E6A'));
    item2.addShape(new Rectangle(146, 336, 113, 94, '#5A4834'));
    walls[0].push(item2);

    let item3 = new Item("Item 3: A blue lofted bed.");
    item3.addShape(new Rectangle(36, 325, 97, 105, '#D6B794'));
    item3.addShape(new Rectangle(42, 336, 82, 23, '#AA8862'));
    item3.addShape(new Rectangle(42, 366, 82, 23, '#AA8862'));
    item3.addShape(new Rectangle(42, 396, 82, 23, '#AA8862'));
    walls[0].push(item3);

    let item4 = new Item("Item 4: A large cabinet.");
    item4.addShape(new Rectangle(36, 209, 72, 16, '#472C1B'));  // Adjusted position
    item4.addShape(new Rectangle(36, 209, 319, 16, '#472C1B'));  // Adjusted position
    item4.addShape(new Rectangle(36, 261, 72, 16, '#472C1B'));  // Adjusted position
    item4.addShape(new Rectangle(36, 313, 72, 16, '#472C1B'));  // Adjusted position
    item4.addShape(new Rectangle(36, 365, 72, 16, '#472C1B'));  // Adjusted position
    item4.addShape(new Rectangle(20, 176, 16, 255, '#472C1B'));  // Adjusted position
    item4.addShape(new Rectangle(355, 177, 16, 255, '#472C1B'));  // Adjusted position
    item4.addShape(new Rectangle(106, 176, 16, 255, '#472C1B'));  // Adjusted position
    walls[0].push(item4);

    let item5 = new Item("Item 5: A desk with a computer.");
    item5.addShape(new Rectangle(82, 175, 264, 34, '#8180AD', 2));  // Adjusted position with rounded edges
    item5.addShape(new Rectangle(91, 155, 50, 20, '#110E4B', 8));  // Adjusted position with rounded edges
    walls[0].push(item5);

    let item6 = new Item("Item 6: A black drawer.");
    item6.addShape(new Rectangle(371, 307, 75, 123, '#474747'));
    item6.addShape(new Rectangle(371, 341, 75, 0, '#000000'));
    item6.addShape(new Rectangle(371, 374, 75, 0, '#000000'));
    item6.addShape(new Rectangle(371, 404, 75, 0, '#000000'));
    walls[0].push(item6);

    let item7 = new Item("Item 7: A small table.");
    item7.addShape(new Rectangle(167, 254, 105, 59, '#000000'));  // Adjusted position
    item7.addShape(new Rectangle(170, 258, 99, 52, '#9B68B4'));  // Adjusted position
    item7.addShape(new Rectangle(217, 313, 4, 12, '#000000'));  // Adjusted position
    walls[0].push(item7);

    let item8 = new Item("Item 8: A small shelf.");
    item8.addShape(new Rectangle(319, 251, 26, 74, '#000000'));
    item8.addShape(new Rectangle(321, 254, 22, 22, '#9B68B4'));
    item8.addShape(new Rectangle(321, 278, 22, 22, '#9B68B4'));
    item8.addShape(new Rectangle(321, 302, 22, 22, '#9B68B4'));
    walls[0].push(item8);

    let item9 = new Item("Item 9: A small cabinet.");
    item9.addShape(new Rectangle(446, 380, 98, 50, '#D9D9D9'));
    item9.addShape(new Rectangle(446, 380, 49, 50, '#D9D9D9'));
    item9.addShape(new Rectangle(495, 380, 49, 50, '#D9D9D9'));
    walls[0].push(item9);

    let item10 = new Item("Item 10: A small chair.");
    item10.addShape(new Rectangle(186 + 7, 332 + 62, 12, 36, '#BD9D3D', 16));  // Adjusted position with rounded edges
    item10.addShape(new Rectangle(186 + 46, 332 + 63, 12, 36, '#BD9D3D', 16));  // Adjusted position with rounded edges
    item10.addShape(new Rectangle(186, 332, 64, 42, '#191B57', 10));  // Adjusted position with rounded edges
    item10.addShape(new Rectangle(186, 332 + 54, 64, 13, '#886637', 20));  // Adjusted position with rounded edges
    item10.addShape(new Rectangle(186 + 41, 332 + 28, 11, 34, '#BD9D3D', 15));  // Adjusted position with rounded edges
    item10.addShape(new Rectangle(186 + 14, 332 + 28, 11, 34, '#BD9D3D', 15));  // Adjusted position with rounded edges
    walls[0].push(item10);

    let item11 = new Item("Item 11: Towels.");
    item11.addShape(new Rectangle(550, 256, 21, 96, '#514F4F'));  // Adjusted position
    item11.addShape(new Rectangle(524, 256, 21, 96, '#514F4F'));  // Adjusted position
    walls[0].push(item11);

    // Initialize items for Wall 2
    let item12 = new Item("Item 12: A small black object.");
    item12.addShape(new Rectangle(281, 257, 20, 35, '#000000', 10));  // Adjusted position with rounded edges
    walls[1].push(item12);
    
    let item13 = new Item("Item 13: A large brown object.");
    item13.addShape(new Rectangle(186, 289, 117, 143, '#816040', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item13);
    
    let item14 = new Item("Item 14: A small yellow object.");
    item14.addShape(new Rectangle(193, 280, 40, 9, '#D7C775', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item14);
    
    let item15 = new Item("Item 15: A small gray object.");
    item15.addShape(new Rectangle(243, 259, 11, 30, '#D9D9D9', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item15);
    
    let item16 = new Item("Item 16: A small green object.");
    item16.addShape(new Rectangle(264, 271, 9, 18, '#A6DBAC', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item16);
    
    let item17 = new Item("Item 17: A small gray object.");
    item17.addShape(new Rectangle(367, 230, 19, 21, '#D9D9D9', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item17);
    
    let item18 = new Item("Item 18: A large black object.");
    item18.addShape(new Rectangle(28, 103, 118, 329, '#000000'));
    item18.addShape(new Rectangle(34, 109, 106, 323, '#816040'));  // Adjusted position
    item18.addShape(new Rectangle(110, 265, 24.5, 10, '#9F9494', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item18);
    
    let item19 = new Item("Item 19: A large gray object.");
    item19.addShape(new Rectangle(186, 372, 63, 30, '#92A4AA', 0, '#000000', 1));  // Adjusted position with black border
    item19.addShape(new Rectangle(186, 342, 63, 30, '#92A4AA', 0, '#000000', 1));  // Adjusted position with black border
    item19.addShape(new Rectangle(249, 402, 63, 30, '#92A4AA', 0, '#000000', 1));  // Adjusted position with black border
    item19.addShape(new Rectangle(249, 372, 63, 30, '#92A4AA', 0, '#000000', 1));  // Adjusted position with black border
    item19.addShape(new Rectangle(186, 402, 63, 30, '#92A4AA', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item19);
    
    let item20 = new Item("Item 20: A large black object.");
    item20.addShape(new Rectangle(409, 103, 118, 329, '#000000'));
    item20.addShape(new Rectangle(447, 234, 80, 198, '#D9D9D9', 0, '#000000', 1));  // Adjusted position with black border
    item20.addShape(new Rectangle(441, 172, 86, 6, '#816040'));  // Adjusted position
    item20.addShape(new Rectangle(465, 125, 51, 47, '#63542E', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item20);
    
    let item21 = new Item("Item 21: A large black object.");
    item21.addShape(new Rectangle(323, 289, 80, 143, '#000000', 0, '#FFFFFF', 1));  // Adjusted position with white border and thickness
    item21.addShape(new Rectangle(323, 332.5, 80, 0, null, 0, '#FFFFFF', 1));  // Adjusted position with white border and thickness
    walls[1].push(item21);
    
    let item22 = new Item("Item 22: A small black object.");
    item22.addShape(new Rectangle(326, 251, 75, 38, '#020202', 0, '#FFFFFF', 1));  // Adjusted position with white border
    item22.addShape(new Rectangle(332, 256, 51, 28, '#535353'));  // Adjusted position
    item22.addShape(new Rectangle(392, 256, 11, 3, '#2D25D8'));  // Adjusted position
    walls[1].push(item22);
    
    let item23 = new Item("Item 23: A small green object.");
    item23.addShape(new Rectangle(470, 178, 41, 76, '#2C6241', 0, '#000000', 1));  // Adjusted position with black border
    walls[1].push(item23);

noLoop();  // We only need to draw when the wall changes or on window resize
}

function draw() {
    background('#1E1E1E');  // Darker background for the room
    
    // Draw the current wall's items
    for (let item of walls[currentWall - 1]) {
        item.draw();
    }
}

function switchWall(wallNumber) {
    currentWall = wallNumber;
    redraw();  // Redraw the room with the new wall's layout
}

function windowResized() {
    // Resize canvas and reposition objects when window is resized
    let container = document.getElementById('sketch-container');
    resizeCanvas(container.clientWidth, container.clientHeight);
    redraw();  // Redraw the room after resizing
}

function mouseMoved() {
    let hovered = false;
    description.style.display = "none";  // Hide description by default

    for (let item of walls[currentWall - 1]) {
        if (item.isHovered(mouseX, mouseY)) {
            description.innerHTML = item.desc;
            hovered = true;
            break;
        }
    }

    if (hovered) {
        description.style.display = "block";  // Show description if hovering over any item
    }
}