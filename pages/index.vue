<template>
  <div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
    <div class="relative max-w-xl mx-auto">
      <svg
        class="absolute left-full transform translate-x-1/2"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
        />
      </svg>
      <svg
        class="absolute right-full bottom-0 transform -translate-x-1/2"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
        />
      </svg>
      <div class="text-center">
        <h2
          class="
            text-3xl
            font-extrabold
            tracking-tight
            text-gray-900
            sm:text-4xl
          "
        >
          Image / PDF Converter
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">
          Convert images to PDF and vice versa.
        </p>
      </div>
      <div class="mt-12">
        <div class="pt-10 sm:col-span-2">
          <nuxt-link to="/images-to-pdf">
            <button
              type="submit"
              class="
                w-full
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                border border-transparent
                rounded-md
                shadow-sm
                text-base
                font-medium
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              Convert Images to PDF
            </button>
          </nuxt-link>
        </div>
        <div class="pt-10 sm:col-span-2">
          <nuxt-link to="/pdf-to-images">
            <button
              type="submit"
              class="
                w-full
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                border border-transparent
                rounded-md
                shadow-sm
                text-base
                font-medium
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              Convert PDF to Images
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploading: false,
      pdfUrl: null,
      form: {
        type: 0,
      },
    };
  },
  methods: {
    async submit(e) {
      const randomTag = Math.random().toString(36).substring(7);
      this.uploading = true;
      const files = e.target.images.files;

      const uploadedFiles = await Promise.all(
        Array.from(files).map(async (file) => {
          /* create a reader */
          const readData = (f) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(f);
            });

          /* Read data */
          const data = await readData(file);

          /* upload the converted data */

          return await this.$cloudinary.upload(data, {
            upload_preset: "nuxtjs-image-pdf-converter",
            folder: `nuxtjs-image-pdf-converter/images/${randomTag}`,
            tags: [randomTag],
          });
        })
      );
      const resp = await this.$axios.get(`/api/generate-pdf?tag=${randomTag}`);

      this.pdfUrl = resp.data.pdf.secure_url;

      this.uploading = false;
    },
  },
};
</script>