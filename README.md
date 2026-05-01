# Jito's Software Development Intern "html2json" Test Task


## Pros of the solution
- Simple and linear processing logic
- Uses a stack to correctly build nested DOM structure
- Clear separation of concerns (tokenization, token processing, element parsing)
- Easy to extend (attributes, additional node types)
- Good readability and suitable for learning purposes





 ## Cons of the solution
- No state-machine based parsing like in real browser engines
- Does not handle complex HTML cases (e.g. <script>, <style>, nested quotes)
- Uses regular expressions for HTML parsing (not fully reliable)
- Not fully compliant with the HTML specification
- Limited edge case handling (broken or malformed HTML, inconsistent self-closing tags)
