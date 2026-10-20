import fs from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

// DESIGN.md rules that can be checked in source: no shadows, corners up to 8px
function sourceFiles(dir: string): string[] {
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
		const full = path.join(dir, entry.name)
		if (entry.isDirectory()) return sourceFiles(full)
		return /\.(tsx|ts|css)$/.test(entry.name) && !entry.name.endsWith('.test.ts') ? [full] : []
	})
}

const files = sourceFiles(path.join(__dirname))

describe('design rules', () => {
	it('uses no shadows anywhere', () => {
		const offenders = files.filter(f => /shadow-|box-shadow|drop-shadow|text-shadow/.test(fs.readFileSync(f, 'utf8')))
		expect(offenders).toEqual([])
	})

	it('keeps corners at 8px or less', () => {
		const offenders = files.filter(f => /rounded-(xl|2xl|3xl|4xl)|rounded-\[(?:9|[1-9]\d)/.test(fs.readFileSync(f, 'utf8')))
		expect(offenders).toEqual([])
	})

	it('never swaps layout in the collapsed sidebar state (only fades and widths)', () => {
		const offenders = files.filter(f => /collapsed:(hidden|sr-only|block|flex|justify-|px-|mx-)/.test(fs.readFileSync(f, 'utf8')))
		expect(offenders).toEqual([])
	})

	it('loads the reference fonts', () => {
		const layout = fs.readFileSync(path.join(__dirname, 'app/layout.tsx'), 'utf8')
		expect(layout).toContain('Manrope')
		expect(layout).toContain('Source_Serif_4')
	})
})
