function convertHtml2JsonAndSet() {
  const htmlTextAreaValue = document.getElementById("html").value;
  const jsonObj = html2json(htmlTextAreaValue);
  const jsonArea = document.getElementById("json");
  jsonArea.textContent = JSON.stringify(jsonObj, null, 2);
}

/* 
  Update this function to convert html into json object.
  You can rewrite it completely, just be sure it accepts htmlText as string and outputs json object.
*/
function html2json(html) {
  const root = { type: "root", children: [] };
  const stack = [root];

  const tokens = tokenize(html);

  for (const token of tokens) {
    processToken(token, stack);
  }

  return root;
}

// ---------------- TOKENIZER ----------------
function tokenize(html) {
  return html.match(/<\/?[^>]+>|[^<]+/g) || [];
}

// ---------------- PROCESS TOKEN ----------------
function processToken(token, stack) {
  token = token.trim();
  if (!token) return;

  const current = stack[stack.length - 1];

  if (isText(token)) {
    current.children.push(createTextNode(token));
    return;
  }

  if (isDoctype(token)) {
    current.children.push(parseDoctype(token));
    return;
  }

  if (isClosingTag(token)) {
    stack.pop();
    return;
  }

  const node = parseElement(token);
  if (!node) return;

  current.children.push(node);

  if (!node.selfClosing) {
    stack.push(node);
  }
}

// ---------------- HELPERS ----------------
function isText(token) {
  return !token.startsWith("<");
}

function isDoctype(token) {
  return token.toUpperCase().startsWith("<!DOCTYPE");
}

function isClosingTag(token) {
  return token.startsWith("</");
}

// ---------------- TEXT ----------------
function createTextNode(text) {
  return {
    type: "text",
    content: text,
  };
}

// ---------------- DOCTYPE ----------------
function parseDoctype(token) {
  return {
    type: "doctype",
    value: token.replace(/<!DOCTYPE\s*|\>/gi, "").trim(),
  };
}

// ---------------- ELEMENT ----------------
function parseElement(token) {
  const isSelfClosing = token.endsWith("/>");

  const tagMatch = token.match(/^<\s*([a-zA-Z0-9-]+)/);
  if (!tagMatch) return null;

  const tag = tagMatch[1];

  const attributes = parseAttributes(token, tag);

  return {
    type: "element",
    tag,
    attributes,
    children: [],
    selfClosing: isSelfClosing,
  };
}

// ---------------- ATTRIBUTES ----------------
function parseAttributes(token, tag) {
  const attrs = {};
  const matches = token.matchAll(/([a-zA-Z0-9-:]+)(="([^"]*)")?/g);

  for (const m of matches) {
    const name = m[1];
    const value = m[3] || true;

    if (name !== tag) {
      attrs[name] = value;
    }
  }

  return attrs;
}

function showExample1() {
  const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport">
    <title>Sample HTML</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the home section of the webpage.</p>
        </section>
        <section id="about">
            <h2>About Section</h2>
            <p>This is the about section of the webpage.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
`;
  const jsonContent = {
    "Comment 1":
      "You have to think about how to take into account various html inputs so your json structure will cover them all and handle different cases.",
    "Comment 2":
      "When you make any choice in terms of selecting specific json structure for conversion - be ready to provide reasoning behind such choice.",
  };

  document.getElementById("html").value = htmlExample;
  document.getElementById("json").textContent = JSON.stringify(
    jsonContent,
    null,
    2,
  );
}

function showExample2() {
  const htmlExample = `<div>
<p>Hello world!</p>
  <button>Click me!</button>
  <textarea>Some very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long string.</textarea>
</div>
`;
  const jsonContent = {
    "Comment 1":
      "You have to think about how to take into account various html inputs so your json structure will cover them all and handle different cases.",
    "Comment 2":
      "When you make any choice in terms of selecting specific json structure for conversion - be ready to provide reasoning behind such choice.",
  };

  document.getElementById("html").value = htmlExample;
  document.getElementById("json").textContent = JSON.stringify(
    jsonContent,
    null,
    2,
  );
}
