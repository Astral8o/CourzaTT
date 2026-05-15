const fs = require('fs');

const TAGS = {
  c001: ['Programming'],
  c002: ['Project Management'],
  c004: ['Graphic Design', 'Programming'],
  c005: ['Microsoft Office'],
  c006: ['Networking', 'Cybersecurity'],
  c007: ['Project Management'],
  c008: ['Cybersecurity'],
  c009: ['Programming'],
  c010: ['Microsoft Office'],
  c011: ['AI & Automation', 'Microsoft Office'],
  c012: ['Networking'],
  c013: ['Microsoft Office'],
  c014: ['Graphic Design', 'Social Media'],
  c015: ['Graphic Design'],
  c016: ['Crafts & Making', 'Event Management'],
  c017: ['Trades'],
  c018: ['Trades'],
  c019: ['Trades'],
  c020: ['Trades'],
  c021: ['Event Management'],
  c022: ['Interior Design'],
  c023: ['Trades'],
  c024: ['Crafts & Making'],
  c025: ['Crafts & Making'],
  c026: ['Crafts & Making', 'Baking & Pastry'],
  c027: ['Crafts & Making'],
  c028: ['HR', 'Leadership'],
  c029: ['Accounting & Finance'],
  c030: ['Sales', 'Marketing'],
  c031: ['Leadership', 'Team Building'],
  c032: ['Administration'],
  c033: ['Event Management'],
  c034: ['Law'],
  c036: ['Administration'],
  c037: ['Public Speaking'],
  c038: ['Language'],
  c039: ['Culinary Arts'],
  c040: ['Healthcare'],
  c041: ['Healthcare'],
  c042: ['Healthcare'],
  c043: ['Healthcare'],
  c044: ['Leadership'],
  c049: ['Accounting & Finance', 'Entrepreneurship'],
  c050: ['Entrepreneurship', 'Law'],
  c051: ['Customer Service', 'Sales'],
  c052: ['Social Media', 'Marketing', 'Entrepreneurship'],
  c053: ['AI & Automation', 'Entrepreneurship'],
  c054: ['Accounting & Finance', 'Entrepreneurship'],
  c055: ['Accounting & Finance', 'Entrepreneurship'],
  c056: ['Customer Service'],
  c057: ['Sales', 'Entrepreneurship'],
  c058: ['Entrepreneurship'],
  c059: ['Entrepreneurship'],
  c060: ['HR', 'Entrepreneurship'],
  c061: ['Leadership', 'Customer Service'],
  c062: ['Entrepreneurship', 'Accounting & Finance'],
  c063: ['Leadership', 'HR'],
  c064: ['Entrepreneurship', 'Law'],
  c065: ['Entrepreneurship'],
  c066: ['Culinary Arts', 'Accounting & Finance'],
  c067: ['Accounting & Finance', 'HR'],
  c068: ['Baking & Pastry', 'Culinary Arts'],
  c069: ['Accounting & Finance'],
  c072: ['Baking & Pastry', 'Culinary Arts'],
  c073: ['Hospitality'],
  c074: ['Baking & Pastry', 'Culinary Arts'],
  c075: ['Baking & Pastry', 'Culinary Arts'],
  c076: ['Culinary Arts'],
  c077: ['Culinary Arts', 'Crafts & Making'],
  c078: ['Agriculture'],
  c079: ['Agriculture'],
  c080: ['Culinary Arts', 'Accounting & Finance'],
  c081: ['Public Speaking', 'Video & Audio'],
  c082: ['AI & Automation'],
  c083: ['Cybersecurity'],
  c084: ['Leadership', 'Project Management'],
  c085: ['Law', 'Entrepreneurship'],
  c086: ['Healthcare'],
  c087: ['Healthcare'],
  c088: ['Video & Audio'],
  c089: ['Leadership'],
  c090: ['Graphic Design', 'Crafts & Making'],
  c091: ['Video & Audio', 'Graphic Design'],
  c092: ['Culinary Arts'],
  c093: ['Baking & Pastry', 'Culinary Arts'],
  c094: ['Social Media', 'Video & Audio'],
  c095: ['Healthcare'],
  c096: ['Entrepreneurship', 'Accounting & Finance'],
  c097: ['Public Speaking'],
  c098: ['Leadership', 'HR'],
  c099: ['Administration'],
  c100: ['Leadership', 'HR'],
  c102: ['Microsoft Office', 'Accounting & Finance'],
  c103: ['Administration'],
  c104: ['Administration'],
  c105: ['Leadership', 'Team Building'],
  c106: ['Leadership', 'Team Building'],
  c107: ['Team Building'],
  c108: ['Sales'],
  c109: ['Team Building', 'Leadership'],
  c110: ['Team Building'],
  c111: ['Sales', 'Leadership'],
  c112: ['Sales'],
  c113: ['Social Media', 'Marketing'],
  c114: ['Marketing'],
  c115: ['HR'],
  c116: ['Cybersecurity'],
  c117: ['Graphic Design', 'Crafts & Making'],
  c118: ['AI & Automation'],
};

let content = fs.readFileSync('/home/claude/repo/data.js', 'utf8');

let updated = 0;
for (const [id, tags] of Object.entries(TAGS)) {
  const tagsStr = JSON.stringify(tags);
  // Find the course block and add tags before the closing brace
  // Look for the id field, then find the next closing brace of that object
  const idPattern = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?)(\\s*\\}\\s*,?\\s*\\n\\s*\\{)`, 'm');
  const idPatternLast = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?)(\\s*\\}\\s*\\n\\];)`, 'm');

  // Skip if already tagged
  const alreadyTagged = new RegExp(`"id":\\s*"${id}"[\\s\\S]{0,500}?"tags":`);
  if (alreadyTagged.test(content)) {
    continue;
  }

  // Try to find and add tags by inserting before the closing brace of this course object
  // Strategy: find the id, then find "featured": false/true which is always last field
  const featuredPattern = new RegExp(
    `("id":\\s*"${id}"[\\s\\S]*?"featured":\\s*(?:false|true))`,
    'm'
  );

  if (featuredPattern.test(content)) {
    content = content.replace(featuredPattern, `$1,\n    "tags": ${tagsStr}`);
    updated++;
  } else {
    console.log(`Could not find: ${id}`);
  }
}

fs.writeFileSync('/home/claude/repo/data.js', content);
console.log(`Tagged ${updated} courses.`);
