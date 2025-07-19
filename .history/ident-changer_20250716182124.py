import os

def detect_indentation(lines):
    for line in lines:
        if line.strip() == "":
            continue
        indent = len(line) - len(line.lstrip())
        if indent > 0:
            return line[:indent]
    return None

def convert_indentation(filepath, new_indent="    "):  # Default: 4 spaces
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_indent = detect_indentation(lines)
    if current_indent is None:
        return  # No indentation found

    print(f"File: {filepath} — Detected indentation: {repr(current_indent)}")

    converted_lines = []
    for line in lines:
        stripped = line.lstrip()
        if not stripped:
            converted_lines.append(line)
            continue
        level = 0
        while line.startswith(current_indent * (level + 1)):
            level += 1
        new_line = new_indent * level + stripped
        converted_lines.append(new_line)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(converted_lines)

def walk_directory(directory, extension=".py", new_indent="    "):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(extension):
                path = os.path.join(root, file)
                convert_indentation(path, new_indent)

# Example usage
if __name__ == "__main__":
    target_directory = "src"
    walk_directory(target_directory, extension=".js", new_indent="        ")  # 4 spaces
