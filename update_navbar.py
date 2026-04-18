import os
import re

directory = r"c:\Users\sriva\OneDrive\Desktop\march websites\independent_record_label"
files = [f for f in os.listdir(directory) if f.endswith('.html')]

# List of files we already updated partially or fully
updated_files = ["index.html", "artists.html"]

about_li_regex = re.compile(r'<li><a href="about\.html" class="nav-link(?: active)?">About</a></li>\s*')
home_dropdown_end = '</ul>\s*</li>'

for filename in files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip dashboard as it doesn't have the regular navbar
    if filename == "dashboard.html":
        continue
    
    # Check if the file has the nav-links
    if '<ul class="nav-links">' not in content:
        continue
        
    # Find the about link
    match = about_li_regex.search(content)
    if not match:
        print(f"Skipping {filename}: About link not found")
        continue
    
    about_li = match.group(0)
    
    # Remove the about link from its current position
    content = about_li_regex.sub('', content)
    
    # Find the home dropdown end and insert about_li after it
    # We look for the closing </li> of the Home dropdown
    # The Home dropdown structure is:
    # <li class="dropdown">
    #     <a href="index.html" ...>Home ...</a>
    #     <ul class="dropdown-menu">...</ul>
    # </li>
    
    home_dropdown_pattern = re.compile(r'(<li class="dropdown">\s*<a href="index\.html".*?</li>)', re.DOTALL)
    
    if home_dropdown_pattern.search(content):
        new_content = home_dropdown_pattern.sub(r'\1\n                ' + about_li.strip(), content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"Skipping {filename}: Home link not found")
