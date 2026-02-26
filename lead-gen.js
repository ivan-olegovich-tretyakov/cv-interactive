const https = require('https');

const FIRMS = ['Egon Zehnder', 'Korn Ferry', 'Spencer Stuart', 'Russell Reynolds', 'Heidrick & Struggles', 'Kienbaum', 'Odgers Berndtson', 'Page Executive'];
const KEYWORDS = ['Consumer', 'FMCG', 'Digital'];
const LOCATIONS = ['Germany', 'Frankfurt', 'Munich'];

// Using a free public API to simulate the scraping since Google Dorks require headless browsers to bypass captchas
// For this demo, we will use duckduckgo-lite HTML parsing
const fetchDDG = (query) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'lite.duckduckgo.com',
            path: '/lite/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const results = [];
                // Regex to extract duckduckgo lite results
                const regex = /<a rel="nofollow" href="([^"]+)" class="result-url"[^>]*>([^<]+)<\/a>.*?<td class="result-snippet">([^<]+)<\/td>/gs;
                let match;
                while ((match = regex.exec(data)) !== null) {
                    if (match[1].includes('linkedin.com/in/')) {
                        results.push({
                            url: match[1],
                            title: match[2].replace(' - LinkedIn', '').trim(),
                            snippet: match[3].trim()
                        });
                    }
                }
                resolve(results);
            });
        });

        req.on('error', (e) => reject(e));
        req.write(`q=${encodeURIComponent(query)}`);
        req.end();
    });
};

async function run() {
    console.log('# Target Executive Search Partners');
    console.log('Generated: ' + new Date().toISOString().split('T')[0] + '\n');
    console.log('| Name / Title | Firm | LinkedIn URL | Snippet |');
    console.log('|---|---|---|---|');

    for (const firm of FIRMS) {
        const query = `site:linkedin.com/in/ "Partner" "${firm}" "Germany" ("Consumer" OR "FMCG")`;
        try {
            const results = await fetchDDG(query);
            for (const r of results.slice(0, 3)) { // Top 3 per firm
                console.log(`| **${r.title}** | ${firm} | [Profile](${r.url}) | _${r.snippet.substring(0, 80)}..._ |`);
            }
            // Be nice to the API
            await new Promise(res => setTimeout(res, 1500));
        } catch (e) {
            console.error(`Error fetching ${firm}:`, e);
        }
    }
}

run();
