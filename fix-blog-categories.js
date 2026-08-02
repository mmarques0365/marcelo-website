const fs = require('fs');
let c = fs.readFileSync('blog.html', 'utf8');

// Fix Browse by Category - make it informational only (no fake links)
// Also correct the counts to match actual 8 posts
const oldCats = `        <!-- Categories -->
        <div class="blog-sidebar__widget">
          <h3>Browse by Category</h3>
          <span class="blog-sidebar__cat">Remission <span>4 articles</span></span>
          <span class="blog-sidebar__cat">Resilience <span>2 articles</span></span>
          <span class="blog-sidebar__cat">Mindset <span>1 article</span></span>
          <span class="blog-sidebar__cat">Recovery <span>1 article</span></span>
        </div>`;

const newCats = `        <!-- Categories -->
        <div class="blog-sidebar__widget">
          <h3>Categories</h3>
          <p style="font-size:0.88rem;color:var(--muted);line-height:1.8;">
            Remission (4) &nbsp;&middot;&nbsp; Resilience (2) &nbsp;&middot;&nbsp; Mindset (1) &nbsp;&middot;&nbsp; Recovery (1)
          </p>
        </div>`;

c = c.replace(oldCats, newCats);
fs.writeFileSync('blog.html', c, 'utf8');
console.log('Blog categories fixed');
