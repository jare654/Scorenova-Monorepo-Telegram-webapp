const fs = require('fs');

let file = fs.readFileSync('src/features/auth/ProfileSetupPage.tsx', 'utf8');

// Add imports for telegram and store
file = file.replace("import { apiClient } from '@/lib/api';", "import { apiClient } from '@/lib/api';\nimport { getInitData } from '@/lib/telegram';\nimport { useAuthStore } from '@/lib/store';");

// Add setUser inside the component
file = file.replace("const navigate = useNavigate();", "const navigate = useNavigate();\n  const setUser = useAuthStore((s) => s.setUser);");

// Update the API call and authentication logic
const oldApiCall = `await apiClient.post('/telegram/auth/complete-profile', {
        fullName,
        stream,
        gender
      });`;

const newApiCall = `const initData = getInitData();
      const response = await apiClient.post('/telegram/auth/complete-profile', {
        initData,
        name: fullName,
        streamId: stream,
        gender
      });
      const { accessToken, refreshToken, user } = (response as any).data || response;
      apiClient.setTokens(accessToken, refreshToken);
      setUser(user);`;

file = file.replace(oldApiCall, newApiCall);

fs.writeFileSync('src/features/auth/ProfileSetupPage.tsx', file);
