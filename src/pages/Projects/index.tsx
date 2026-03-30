import { useState } from 'react';
import { Plus, Search, FolderOpen } from 'lucide-react';
import Layout from '@/layout';
import { Button } from '@/atoms';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');

  return (
    <Layout>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your test automation projects
          </p>
        </div>
        <Button className="gap-1.5">
          <Plus size={15} />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring"
          />
        </div>
        <select className="h-9 px-3 rounded-lg border border-border bg-background text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring min-w-32 cursor-pointer">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-primary/40">
          <FolderOpen size={64} strokeWidth={1.2} />
        </div>
        <div className="text-center">
          <p className="text-primary font-medium text-sm">
            You don't have any projects
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Please create a project to get started.
          </p>
        </div>
        <Button className="gap-1.5 mt-1">
          <Plus size={15} />
          New Project
        </Button>
      </div>
    </Layout>
  );
}
