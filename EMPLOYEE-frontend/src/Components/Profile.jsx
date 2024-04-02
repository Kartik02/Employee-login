import React from "react";

function Profile() {
  return (
<div class="max-w-4xl mx-auto p-6 bg-white border rounded-lg">
  <h1 class="text-2xl font-semibold mb-6">Profile settings</h1>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="md:col-span-1">
      <div class="flex flex-col">
        <label class="block text-sm font-medium mb-1" for="profile-photo">
          Profile photo
        </label>
        <span class="text-xs text-gray-500 mb-2">Formats: png, jpg, gif. Max size: 1 MB.</span>
        <div class="flex items-center space-x-4">
          <span class="relative flex h-[90px] w-[90px] overflow-hidden rounded-full">
            <img class="aspect-square h-full w-full" alt="SR" src="data:image/jpeg;base64,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" />
          </span>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white">
            UPLOAD IMAGE
          </button>
        </div>
      </div>
    </div>
    <div class="md:col-span-2">
      <div class="border-t border-gray-200 pt-4">
        <h2 class="text-lg font-semibold mb-4">Personal info</h2>
        <p class="text-sm text-gray-600 mb-4">Your log-in credentials and the name that is displayed in reports.</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="sm:col-span-1">
            <label class="block text-sm font-medium mb-1" for="name">
              Name
            </label>
            <div class="flex items-center">
              <input
                id="name"
                class="form-input w-full border-gray-300 rounded-md shadow-sm"
                readonly=""
                type="text"
                value="Srikupa"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium mb-1" for="email">
              Email
            </label>
            <div class="flex items-center">
              <input
                id="email"
                class="form-input w-full border-gray-300 rounded-md shadow-sm mr-2"
                readonly=""
                type="email"
                value="srikupah@gmail.com"
              />
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white">
                Change
              </button>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium mb-1" for="password">
              Password
            </label>
            <div class="flex items-center">
              <input
                id="password"
                class="form-input w-full border-gray-300 rounded-md shadow-sm mr-2"
                readonly=""
                type="password"
                value="Password"
              />
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Profile;
