"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Briefcase } from "lucide-react";

type Role = {
  id: number;
  roles: string;
  base_rate: number;
};

export default function RoleSelect({
  onSelect,
}: {
  onSelect: (role: Role) => void;
}) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await fetch("/api/roles");
      const data = await res.json();
      setRoles(data);
      setFilteredRoles(data);
      if (data.length > 0) {
        const defaultRole = data[0];
        setSelectedRole(defaultRole.roles);
        onSelect(defaultRole);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (value: string) => {
    setSelectedRole(value);
    const selected = roles.find((r) => r.roles === value);
    if (selected) onSelect(selected);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const filtered = roles.filter((role) =>
      role.roles.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRoles(filtered);
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div>
    <label className="flex items-center text-sm gap-2 text-gray-700 dark:text-zinc-300 mb-2 block">
        <Briefcase className="w-4 h-4" />
          Role
      </label>
      <Select
        value={selectedRole}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full py-6 bg-button rounded-lg">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search role..."
              className="mb-2"
            />
          </div>
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role) => (
              <SelectItem key={role.id} value={role.roles}>
                {role.roles}
              </SelectItem>
            ))
          ) : (
            <div className="px-4 py-2 text-muted-foreground text-sm">
              No roles found.
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
