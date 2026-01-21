import { Transformer } from '@parcel/plugin';
import { parse } from 'node-html-parser'; // Or another HTML parser

export default new Transformer({
    async transform({ asset }) {
        if (asset.type === 'html') {
            let code = await asset.getCode();
            const root = parse(code);
            
            const targetDiv = root.querySelector('#ghosts');
            if (targetDiv) {
                const modifiedHtml = await processHtml(targetDiv.innerHTML);
                targetDiv.set_content(modifiedHtml);
            }

            asset.setCode(root.toString());
        }
        return [asset];
    },
});

async function processHtml(html) {
    return html
        .replace(/\*(.*?)\*/g, '<b>$1</b>')
        .replace(/\b(Interactions)\b/g, '<span class="interactions">$1</span>')
        .replace(/\b(Sanity Loss)\b/g, '<span class="sanity-loss">$1</span>')
        .replace(/\b(Ghost Events?)\b/g, '<span class="ghost-events">$1</span>')
        .replace(/\b(When Hunting)\b/g, '<span class="when-hunting">$1</span>')
        .replace(/\b(Sanity Hunt Threshold)\b/g, '<span class="sanity-hunt-threshold">$1</span>')
        .replace(/\b(Hunt Initiation)\b/g, '<span class="hunt-initiation">$1</span>')
        .replace(/\b(Hunting Speed)\b/g, '<span class="hunting-speed">$1</span>')
        .replace(/\b(Incense Hunt Prevention)\b/g, '<span class="incense-hunt-prevention">$1</span>')
}