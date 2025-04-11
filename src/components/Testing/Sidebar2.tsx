import { Sidebar } from '@rewind-ui/core';
import { Rocket, Briefcase, Users, Shield, Key, Sliders, BellRing, Mail, Book } from 'lucide-react';

export default function ShowcaseSidebar() {
  return (
    <div className="w-full max-w-xs">
      <Sidebar shadow="base" className="relative">
        <Sidebar.Head>
          <Sidebar.Head.Logo>
            <img src="/images/rewind.svg" width={48} height={48} alt="Rewind-UI" />
          </Sidebar.Head.Logo>
          <Sidebar.Head.Title>Rewind-UI</Sidebar.Head.Title>
          <Sidebar.Head.Toggle />
        </Sidebar.Head>

        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Item icon={<Rocket />} label="Dashboard" href="#" active />
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title>Management</Sidebar.Nav.Section.Title>
            <Sidebar.Nav.Section.Item icon={<Briefcase />} label="Clients" href="#" />
            <Sidebar.Nav.Section.Item icon={<Users />} label="Users" as="button">
              <Sidebar.Nav.Section isChild>
                <Sidebar.Nav.Section.Item label="List all" href="#" />
                <Sidebar.Nav.Section.Item label="Add new" href="#" />
                <Sidebar.Nav.Section.Item label="Archived" href="#" />
              </Sidebar.Nav.Section>
            </Sidebar.Nav.Section.Item>
            <Sidebar.Nav.Section.Item icon={<Shield />} label="Roles" href="#" />
            <Sidebar.Nav.Section.Item icon={<Key />} label="Permissions" href="#" />
            <Sidebar.Nav.Section.Item icon={<Sliders />} label="Settings" href="#" />
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title>Support</Sidebar.Nav.Section.Title>
            <Sidebar.Nav.Section.Item icon={<BellRing />} label="Contact" href="#" />
            <Sidebar.Nav.Section.Item icon={<Mail />} label="Tickets" href="#" />
            <Sidebar.Separator />
            <Sidebar.Nav.Section.Item icon={<Book />} label="Documentation" href="#" />
          </Sidebar.Nav.Section>
        </Sidebar.Nav>

        <Sidebar.Footer>
          <div className="flex flex-col justify-center items-center text-sm">
            <span className="font-semibold">Rewind-UI</span>
            <span>version x.y.z</span>
          </div>
        </Sidebar.Footer>
      </Sidebar>
    </div>
  );
}