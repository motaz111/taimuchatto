import { useState, useRef } from "react";
import { THEMES } from "../../constants";
import { useThemeStore } from "../../store/useThemeStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Send, Pencil } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const fileInputRef = useRef(null);

  const [inputs, setInputs] = useState({
    fullName: authUser.fullName,
    username: authUser.username,
  });
  const [profilePic, setProfilePic] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const success = await updateProfile({ ...inputs, profilePic });
    if (success) {
      setProfilePic(null);
    }
  };

  return (
    <div className="h-screen container mx-auto px-4 pt-10 max-w-5xl">
      <div className="space-y-12">
        {/* Profile Settings Section */}
        <div>
          <div className="flex flex-col gap-1 mb-6">
            <h2 className="text-lg font-semibold">Profile Settings</h2>
            <p className="text-sm text-base-content/70">Update your profile information</p>
          </div>
          <form onSubmit={handleUpdateProfile} className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-32 h-32 group">
              <img
                src={profilePic || authUser.profilePic}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
              <div
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => fileInputRef.current.click()}
              >
                <Pencil size={24} className="text-white" />
              </div>
              <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="flex-1 flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={inputs.fullName}
                  onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Username</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={inputs.username}
                  onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary self-end" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? <span className="loading loading-spinner"></span> : "Update"}
              </button>
            </div>
          </form>
        </div>

        {/* Theme Settings Section */}
        <div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-4">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  theme === t ? "bg-base-200" : "hover:bg-base-200/50"
                }`}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="pb-12">
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg mx-auto">
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                            message.isSent ? "bg-primary text-primary-content" : "bg-base-200"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-[10px] mt-1.5 ${
                              message.isSent ? "text-primary-content/70" : "text-base-content/70"
                            }`}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;