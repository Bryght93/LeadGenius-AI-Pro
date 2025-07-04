import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  HelpCircle, 
  CheckSquare,
  BarChart3,
  Eye,
  Edit,
  Sparkles,
  Zap,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialMagnets = [
  {
    id: 1,
    title: "Ultimate Fitness Challenge Guide",
    type: "eBook",
    industry: "Fitness",
    leads: 234,
    conversion: 24.5,
    status: "active",
    created: "2 days ago"
  },
  {
    id: 2,
    title: "What's Your Investment Style?",
    type: "Quiz",
    industry: "Finance",
    leads: 189,
    conversion: 31.2,
    status: "active",
    created: "1 week ago"
  },
  {
    id: 3,
    title: "Small Business Startup Checklist",
    type: "Checklist",
    industry: "Business",
    leads: 156,
    conversion: 18.7,
    status: "paused",
    created: "2 weeks ago"
  }
];

const magnetTypes = [
  { value: "ebook", label: "eBook", icon: FileText },
  { value: "quiz", label: "Quiz", icon: HelpCircle },
  { value: "checklist", label: "Checklist", icon: CheckSquare },
  { value: "assessment", label: "Assessment", icon: BarChart3 }
];

const industries = [
  "Fitness & Health",
  "Real Estate", 
  "Business Consulting",
  "Finance & Investment",
  "Marketing & Digital",
  "Education & Coaching"
];

function getStatusColor(status: string) {
  switch (status) {
    case "active": return "bg-success/10 text-success border-success/20";
    case "paused": return "bg-warning/10 text-warning border-warning/20";
    case "draft": return "bg-muted text-muted-foreground border-border";
    default: return "bg-muted text-muted-foreground border-border";
  }
}

function getTypeIcon(type: string) {
  switch (type.toLowerCase()) {
    case "ebook": return FileText;
    case "quiz": return HelpCircle;
    case "checklist": return CheckSquare;
    case "assessment": return BarChart3;
    default: return FileText;
  }
}

export default function LeadMagnets() {
  const [magnets, setMagnets] = useState(initialMagnets);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!selectedType || !selectedIndustry || !businessDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate your lead magnet.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newMagnet = {
        id: Date.now(),
        title: `AI-Generated ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} for ${selectedIndustry}`,
        type: selectedType.charAt(0).toUpperCase() + selectedType.slice(1),
        industry: selectedIndustry,
        leads: 0,
        conversion: 0,
        status: "draft",
        created: "Just now"
      };
      
      setMagnets(prev => [newMagnet, ...prev]);
      setIsGenerating(false);
      setIsBuilderOpen(false);
      
      toast({
        title: "Lead Magnet Generated! 🎉",
        description: "Your AI-powered lead magnet has been created and added to your collection.",
      });
      
      // Reset form
      setSelectedType("");
      setSelectedIndustry("");
      setBusinessDescription("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background pt-20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lead Magnets</h1>
            <p className="text-muted-foreground">Create and manage your AI-powered lead magnets</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gradient-primary text-white hover:shadow-strong">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Magnet
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center text-2xl">
                    <Sparkles className="w-6 h-6 mr-2 text-accent" />
                    AI Lead Magnet Builder
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  {/* Form */}
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="type">Lead Magnet Type *</Label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose magnet type" />
                        </SelectTrigger>
                        <SelectContent>
                          {magnetTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Business Description *</Label>
                      <Textarea
                        id="description"
                        rows={4}
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                        placeholder="Describe your business, products, or services..."
                      />
                    </div>
                  </div>
                  
                  {/* Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">AI Preview</h3>
                    <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>AI will generate a preview here</p>
                        <p className="text-sm">Fill in the form to see magic happen</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                  <Button variant="outline" onClick={() => setIsBuilderOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="gradient-primary text-white hover:shadow-strong"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Generate Lead Magnet
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-soft">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search lead magnets..." 
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ebook">eBook</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="checklist">Checklist</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lead Magnets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {magnets.map((magnet) => {
            const IconComponent = getTypeIcon(magnet.type);
            return (
              <Card key={magnet.id} className="border-0 shadow-soft hover:shadow-strong transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <Badge className={getStatusColor(magnet.status)} variant="outline">
                      {magnet.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{magnet.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {magnet.type} • {magnet.industry} Industry
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Leads Generated</span>
                      <span className="font-medium">{magnet.leads}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Conversion Rate</span>
                      <span className="font-medium text-success">{magnet.conversion}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${magnet.conversion}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
