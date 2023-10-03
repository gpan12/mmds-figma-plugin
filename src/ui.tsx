import { render, Container, Text, VerticalSpace, Button } from '@create-figma-plugin/ui'
import { h } from 'preact'
import '!./output.css'
import { emit } from '@create-figma-plugin/utilities'

function Plugin () {
  return (
    <Container space='medium'>
      <VerticalSpace space='medium' />
      <Button onClick={() => emit("IMPORT")}>Import variables</Button>
      <VerticalSpace space='medium' />
    </Container>
  )
}

export default render(Plugin)
