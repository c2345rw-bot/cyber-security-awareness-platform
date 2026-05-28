import { useState } from "react";
import { useGetScamReports, useGetScamStats, useSubmitScamReport, getGetScamReportsQueryKey, getGetScamStatsQueryKey } from "@workspace/api-client-react";
import { useLanguage } from "@/lib/i18n";
import { ShieldAlert, Plus, MessageSquare, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function Scams() {
  const { t, language } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data: reports, isLoading: isLoadingReports } = useGetScamReports(
    categoryFilter !== "all" ? { category: categoryFilter } : {}
  );
  const { data: stats } = useGetScamStats();
  const submitReport = useSubmitScamReport();

  const [formData, setFormData] = useState({ platform: "", category: "", message: "" });

  const getLocalizedField = (obj: any, field: string) => {
    if (!obj) return '';
    const key = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
    return obj[key] || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitReport.mutateAsync({ data: formData });
      setIsDialogOpen(false);
      setFormData({ platform: "", category: "", message: "" });
      toast.success(t("report_submitted_success"));
      queryClient.invalidateQueries({ queryKey: getGetScamReportsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetScamStatsQueryKey() });
    } catch {
      toast.error(t("report_submitted_error"));
    }
  };

  const categoryLabels: Record<string, string> = {
    telegram: "Telegram",
    instagram: "Instagram",
    phishing: "Phishing",
    job_scam: "Fake Job",
    other: "Other",
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-destructive" />
            {t("scams_title")}
          </h1>
          <p className="text-muted-foreground mt-2">{t("scams_subtitle")}</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="font-bold shrink-0">
              <Plus className="w-5 h-5 mr-2" />
              {t("report_scam")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("report_scam")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("platform")}</label>
                <Input
                  required
                  value={formData.platform}
                  onChange={e => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="e.g. Telegram, Instagram, SMS"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("category")}</label>
                <Select required value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("select_category")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phishing">Phishing</SelectItem>
                    <SelectItem value="telegram">Telegram Scam</SelectItem>
                    <SelectItem value="instagram">Instagram Scam</SelectItem>
                    <SelectItem value="job_scam">Fake Job Offer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("message")}</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("scam_message_placeholder")}
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full font-bold" disabled={submitReport.isPending}>
                {submitReport.isPending ? t("submitting") : t("submit_report")}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Educational examples notice */}
      <div className="flex items-start gap-3 bg-primary/10 border border-primary/20 rounded-xl p-4 text-sm">
        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p className="text-foreground">{t("scams_examples_notice")}</p>
      </div>

      {/* Category filter — only show when there are reports */}
      {stats && stats.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Button
            variant={categoryFilter === "all" ? "default" : "outline"}
            onClick={() => setCategoryFilter("all")}
            className="rounded-full shrink-0"
          >
            {t("all_reports")}
          </Button>
          {stats.map(s => (
            <Button
              key={s.category}
              variant={categoryFilter === s.category ? "default" : "outline"}
              onClick={() => setCategoryFilter(s.category)}
              className="rounded-full shrink-0"
            >
              {categoryLabels[s.category] ?? s.category} ({s.count})
            </Button>
          ))}
        </div>
      )}

      <div className="grid gap-4">
        {isLoadingReports ? (
          Array(3).fill(0).map((_, i) => (
            <Card key={i} className="bg-card">
              <CardContent className="p-6">
                <Skeleton className="h-4 w-32 mb-4" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))
        ) : reports?.length ? (
          reports.map(report => (
            <Card key={report.id} className="bg-card border-border overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b border-border flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  {report.platform}
                </div>
                <span className="bg-background px-2 py-0.5 rounded text-xs font-bold text-muted-foreground border border-border uppercase tracking-wide">
                  {categoryLabels[report.category] ?? report.category}
                </span>
              </div>
              <CardContent className="p-4 md:p-6 space-y-4">
                <p className="font-mono text-sm bg-background p-4 rounded-xl border border-border whitespace-pre-wrap">
                  {report.message}
                </p>
                {(getLocalizedField(report, 'warning') || report.warningEn) && (
                  <div className="flex items-start gap-2 text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-lg">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <span>{getLocalizedField(report, 'warning') || report.warningEn}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 space-y-3 text-muted-foreground">
            <ShieldAlert className="w-12 h-12 mx-auto opacity-20" />
            <p className="font-semibold text-foreground">{t("scams_empty_title")}</p>
            <p className="text-sm">{t("scams_empty_desc")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
