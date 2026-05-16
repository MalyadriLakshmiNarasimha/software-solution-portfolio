export const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
};

export const truncate = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + '…';
};

export const slugToTitle = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
