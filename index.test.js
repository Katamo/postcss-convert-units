const postcss = require('postcss')

const plugin = require('./index')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })

  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('converts sp to rem by default', async () => {
  await run(
    'a{ margin: 1sp;}',
    'a{ margin: 0.25rem;}',
    {}
  );
})

it('uses custom convert function and units', async () => {
  await run(
    'a{ margin: 1pw;}',
    'a{ margin: 0.25rem;}',
    {
      units : [{ from: 'pw', convert: val => `${val * 0.25}rem` }]
    }
  );
})

it('uses multiple custom convert function and units', async () => {
  await run(
    'a{ margin: 1pw 1sp;}',
    'a{ margin: 0.25rem 1rem;}',
    {
      units : [
        { from: 'pw', convert: val => `${val * 0.25}rem` },
        { from: 'sp', convert: val => `${val}rem` }
      ]
    }
  );
})
