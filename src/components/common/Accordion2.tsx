import { Accordion } from '@rewind-ui/core';

function Accordion2() {
  return (
    <Accordion defaultItem="item-1" activeColor="purple" bordered={false} color="zinc" shadow="base" shadowColor="gray">
      <Accordion.Item anchor="item-1">
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion.Item>

      <Accordion.Item anchor="item-2">
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion.Item>

      <Accordion.Item anchor="item-3">
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
export default Accordion2;