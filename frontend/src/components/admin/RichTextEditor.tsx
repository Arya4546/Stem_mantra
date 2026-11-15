"use client";

import { useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Code2,
  Heading2,
  Heading3,
  Heading4,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { uploadImage, type UploadedMedia } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { Button, Field, Input, Modal } from "./ui";

function ToolButton({ label, active, disabled, onClick, children }: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "w-9 h-9 inline-flex items-center justify-center rounded-lg text-slate-600 transition-colors disabled:opacity-30",
        active ? "bg-orange-100 text-orange-700" : "hover:bg-slate-100 hover:text-slate-900",
      )}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="w-px h-6 bg-slate-200 mx-1" aria-hidden />;

function Toolbar({ editor, onLink, onImage, uploading }: { editor: Editor; onLink: () => void; onImage: () => void; uploading: boolean }) {
  const chain = () => editor.chain().focus();
  return (
    <div className="sticky top-16 z-10 flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-200 bg-white/95 backdrop-blur rounded-t-2xl">
      <ToolButton label="Paragraph" active={editor.isActive("paragraph")} onClick={() => chain().setParagraph().run()}>
        <Pilcrow className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => chain().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => chain().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => chain().toggleHeading({ level: 4 }).run()}>
        <Heading4 className="w-4 h-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="Bold (Ctrl+B)" active={editor.isActive("bold")} onClick={() => chain().toggleBold().run()}>
        <Bold className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Italic (Ctrl+I)" active={editor.isActive("italic")} onClick={() => chain().toggleItalic().run()}>
        <Italic className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Underline (Ctrl+U)" active={editor.isActive("underline")} onClick={() => chain().toggleUnderline().run()}>
        <UnderlineIcon className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Strikethrough" active={editor.isActive("strike")} onClick={() => chain().toggleStrike().run()}>
        <Strikethrough className="w-4 h-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="Bulleted list" active={editor.isActive("bulletList")} onClick={() => chain().toggleBulletList().run()}>
        <List className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => chain().toggleOrderedList().run()}>
        <ListOrdered className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Quote" active={editor.isActive("blockquote")} onClick={() => chain().toggleBlockquote().run()}>
        <Quote className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Code block" active={editor.isActive("codeBlock")} onClick={() => chain().toggleCodeBlock().run()}>
        <Code2 className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Divider line" onClick={() => chain().setHorizontalRule().run()}>
        <Minus className="w-4 h-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="Add link" active={editor.isActive("link")} onClick={onLink}>
        <Link2 className="w-4 h-4" />
      </ToolButton>
      {editor.isActive("link") && (
        <ToolButton label="Remove link" onClick={() => chain().extendMarkRange("link").unsetLink().run()}>
          <Unlink className="w-4 h-4" />
        </ToolButton>
      )}
      <ToolButton label="Insert image" onClick={onImage} disabled={uploading}>
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
      </ToolButton>
      <Divider />
      <ToolButton label="Undo (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => chain().undo().run()}>
        <Undo2 className="w-4 h-4" />
      </ToolButton>
      <ToolButton label="Redo (Ctrl+Shift+Z)" disabled={!editor.can().redo()} onClick={() => chain().redo().run()}>
        <Redo2 className="w-4 h-4" />
      </ToolButton>
    </div>
  );
}

/** WYSIWYG editor for blog posts. Produces HTML that the API sanitises before saving. */
export default function RichTextEditor({ initialHtml, onChange }: { initialHtml: string; onChange: (html: string, words: number) => void }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [link, setLink] = useState({ href: "", text: "" });
  const [pendingImage, setPendingImage] = useState<UploadedMedia | null>(null);
  const [imageAlt, setImageAlt] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      LinkExtension.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: null, target: null } }),
      ImageExtension.configure({ HTMLAttributes: { loading: "lazy" } }),
      Placeholder.configure({ placeholder: "Start writing… Use headings (H2, H3) to structure the article — it helps readers and Google." }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none min-h-[480px] px-5 sm:px-8 py-6 focus:outline-none prose-headings:font-bold prose-a:text-orange-600 prose-img:rounded-xl prose-img:mx-auto",
      },
    },
    onUpdate: ({ editor: e }) => {
      const text = e.getText();
      onChange(e.isEmpty ? "" : e.getHTML(), text.trim() ? text.trim().split(/\s+/).length : 0);
    },
  });

  if (!editor) return <div className="min-h-[540px] rounded-2xl border border-slate-200 bg-white" />;

  const openLink = () => {
    const { from, to } = editor.state.selection;
    setLink({ href: editor.getAttributes("link").href ?? "", text: editor.state.doc.textBetween(from, to, " ") });
    setLinkOpen(true);
  };

  const applyLink = () => {
    const raw = link.href.trim();
    if (!raw) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const href = /^(https?:\/\/|mailto:|tel:|\/)/i.test(raw) ? raw : `https://${raw}`;
      if (editor.state.selection.empty && !editor.isActive("link")) {
        editor
          .chain()
          .focus()
          .insertContent({ type: "text", text: link.text.trim() || href, marks: [{ type: "link", attrs: { href } }] })
          .run();
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
      }
    }
    setLinkOpen(false);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const media = await uploadImage(file, "blog-inline");
      setImageAlt(file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
      setPendingImage(media);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Toolbar editor={editor} onLink={openLink} onImage={() => fileInput.current?.click()} uploading={uploading} />
      <EditorContent editor={editor} />
      <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" onChange={(e) => void onFile(e.target.files?.[0])} />

      <Modal
        open={linkOpen}
        onOpenChange={setLinkOpen}
        title="Link"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setLinkOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyLink}>{link.href.trim() ? "Apply" : "Remove link"}</Button>
          </>
        }
      >
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            applyLink();
          }}
        >
          <Field label="URL" htmlFor="link-href" hint="Use /contact for pages on this website, or a full https:// address.">
            <Input id="link-href" value={link.href} onChange={(e) => setLink({ ...link, href: e.target.value })} placeholder="https://" autoFocus />
          </Field>
          {editor.state.selection.empty && !editor.isActive("link") && (
            <Field label="Text to show" htmlFor="link-text">
              <Input id="link-text" value={link.text} onChange={(e) => setLink({ ...link, text: e.target.value })} />
            </Field>
          )}
          <button type="submit" className="hidden" />
        </form>
      </Modal>

      <Modal
        open={pendingImage !== null}
        onOpenChange={(open) => !open && setPendingImage(null)}
        title="Insert image"
        footer={
          <>
            <Button variant="secondary" onClick={() => setPendingImage(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (pendingImage) editor.chain().focus().setImage({ src: pendingImage.url, alt: imageAlt.trim() }).run();
                setPendingImage(null);
              }}
            >
              Insert
            </Button>
          </>
        }
      >
        {pendingImage && (
          <div className="space-y-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pendingImage.thumbUrl ?? pendingImage.url} alt="" className="w-full max-h-64 object-contain rounded-xl bg-slate-50" />
            <Field label="Image description (alt text)" htmlFor="img-alt" hint="Describe the image for Google and screen readers." count={imageAlt.length} max={250}>
              <Input id="img-alt" value={imageAlt} maxLength={250} onChange={(e) => setImageAlt(e.target.value)} autoFocus />
            </Field>
          </div>
        )}
      </Modal>
    </div>
  );
}
