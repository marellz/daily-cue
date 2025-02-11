<template>
    <toast-wrapper />
    <layout-header class="bg-tea-green/25" />
    <main class="flex-auto py-10 bg-tea-green/25">
        <slot />
    </main>
    <footer class="bg-tea-green text-sea-green py-8">
        <layout-container>
            <div class="flex items-center space-x-4 text-sm text-center">
                <p>
                    Created by <a href="https://dave-njoroge.vercel.app" target="_blank" rel="noopener noreferrer">Dave
                        Njoroge</a>
                    <span>
                        &ndash;
                    </span>
                    <a target="_blank" href="mailto:davenjoroge10@gmail.com">Contact me</a>
                </p>
            </div>
        </layout-container>
    </footer>
</template>
