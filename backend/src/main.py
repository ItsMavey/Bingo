from reportlab.lib.pagesizes import letter, landscape  # change to A4 if needed
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
import random

# ----------- CONFIG -----------
PAGE_SIZE = landscape(letter)  # or use A4
MARGIN = 0.5 * inch
CARDS_PER_PAGE = 2  # side by side
# ------------------------------

def generate_bingo_card():
    """Return a 5x5 list of random bingo numbers with center 'FREE'."""
    columns = {
        "B": random.sample(range(1, 16), 5),
        "I": random.sample(range(16, 31), 5),
        "N": random.sample(range(31, 46), 5),
        "G": random.sample(range(46, 61), 5),
        "O": random.sample(range(61, 76), 5),
    }
    card = [[columns[c][r] for c in "BINGO"] for r in range(5)]
    card[2][2] = "Free"  # Free space
    return card

def draw_bingo_card(c, x, y, card_width, card_height):
    """Draw one bingo card with top-left corner (x, y)."""
    cell = min(card_width, card_height) / 5
    c.setLineWidth(1)

    # Title row: BINGO
    c.setFont("Helvetica-Bold", 20)
    for i, letter in enumerate("BINGO"):
        c.drawCentredString(x + (i + 0.5) * cell, y + card_height + 0.3 * inch, letter)

    # Draw grid
    for i in range(6):
        c.line(x, y + i * cell, x + 5 * cell, y + i * cell)
        c.line(x + i * cell, y, x + i * cell, y + 5 * cell)

    # Fill numbers
    c.setFont("Helvetica", 14)
    card = generate_bingo_card()
    for r in range(5):
        for col in range(5):

            cx = x + (col + 0.5) * cell
            cy = y + (4.5 - r) * cell

            value = str(card[r][col])

            if r == 2 and col == 2:
                c.setFont("Helvetica-Bold", 14)
                c.drawCentredString(cx, cy + 5, "DDV")
                c.drawCentredString(cx, cy - 10, "2025")
                c.setFont("Helvetica", 14)
            else:
                c.drawCentredString(cx, cy, str(card[r][col]))

def generate_pdf(filename="bingo_sheets.pdf", pages=5):
    """Generate a PDF with two bingo cards per page, side by side."""
    c = canvas.Canvas(filename, pagesize=PAGE_SIZE)
    width, height = PAGE_SIZE

    # Each card gets half the width minus margins
    available_width = width - MARGIN * 3
    card_width = available_width / 2
    card_height = card_width  # square cards

    for _ in range(pages):
        left_x = MARGIN
        right_x = MARGIN * 2 + card_width
        y = (height - card_height) / 2 - 0.3 * inch  # vertically centered

        draw_bingo_card(c, left_x, y, card_width, card_height)
        draw_bingo_card(c, right_x, y, card_width, card_height)

        c.showPage()

    c.save()
    print(f"✅ Generated {filename}")

if __name__ == "__main__":
    generate_pdf("bingo_sheets.pdf", pages=75)