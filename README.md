# Jito's Software Development Intern "html2json" Test Task

Pros of my solution
-Simple and linear processing logic
-Uses a stack to correctly build nested DOM structure
-Clear separation of concerns (tokenize, processToken, parseElement)
-Easy to extend (attributes, new node types)

Cons of the solution
-Uses regex for parsing HTML (not fully reliable)
-Does not handle complex HTML cases (script/style, nested quotes, malformed HTML)
-No real state-machine parsing like browser engines
-Limited edge case handling (broken markup, self-closing inconsistencies)
-No full compliance with HTML specification
