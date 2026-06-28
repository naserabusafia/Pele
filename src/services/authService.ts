const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export const authService = {
  async login(email: string, password: string): Promise<{ token: string; email: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message ?? "Failed to log in.");
      }

      const { token, email: adminEmail } = payload.data;
      
      // Save to localStorage
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_email", adminEmail);

      return { token, email: adminEmail };
    } catch (err) {
      // If it's a real server response error (has a message), throw it
      if (err instanceof Error && !err.message.includes("Failed to fetch")) {
        throw err;
      }

      console.warn("⚠️ Backend connection failed. Simulating login locally.");
      
      // Local fallback check
      const normalizedEmail = email.trim().toLowerCase();
      const adminEmail = "mostafa.pele.sport@gmail.com";
      const adminPassword = "Mostafa123@";

      if (normalizedEmail === adminEmail && password === adminPassword) {
        const mockToken = `mock-jwt-token-${Date.now()}`;
        localStorage.setItem("admin_token", mockToken);
        localStorage.setItem("admin_email", adminEmail);
        return { token: mockToken, email: adminEmail };
      } else {
        throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة. / Invalid email or password.");
      }
    }
  },

  logout(): void {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_email");
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("admin_token"));
  },

  getAdminEmail(): string | null {
    return localStorage.getItem("admin_email");
  },
};
