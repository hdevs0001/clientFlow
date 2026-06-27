"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  GalleryVerticalEndIcon,
  ChevronsUpDownIcon,
  CheckIcon,
} from "lucide-react";
import Image from "next/image";

export function VersionSwitcher({
  versions,
  defaultVersion,
}: {
  versions: string[];
  defaultVersion: string;
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mt-6"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-500 text-sidebar-primary-foreground overflow-hidden">
                <Image
                  src="/image.png"
                  alt="Logo"
                  width={17}
                  height={17}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-0.2 leading-none">
                <span className="font-medium text-2xl">ClientFlow</span>
                <span className="text-[12px] leading-none">Freelance Mangament</span>
              </div>
              {/* <ChevronsUpDownIcon className="ml-auto" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/* <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {versions.map((version) => (
              <DropdownMenuItem
                key={version}
                onSelect={() => setSelectedVersion(version)}
              >
                v{version}{" "}
                {version === selectedVersion && (
                  <CheckIcon className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent> */}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
