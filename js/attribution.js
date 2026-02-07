// ✅ DEPLOYMENT CHECK
console.log("✅ attribution.js LOADED — fbclid TTL (7 days) + discount TTL (1 minute) + loader baton");

(function () {
  const KEY = "fbclid_data";

  // ✅ 7-day click attribution window (Meta-like) — FBCLID ONLY
  const TTL_MS = 7 * 24 * 60 * 60 * 1000;

  // ✅ NEW: 1-minute TTL for DISCOUNT CODE ONLY
  const DISCOUNT_TTL_MS = 60 * 1000; // 1 minute

  const ALLOWED_EXTERNAL_HOSTS = new Set([
    "app.bitely.com.au",
    "bitely.com.au",
    "www.bitely.com.au"
  ]);

  // ✅ Loader baton params (for Bitely to show loader on arrival)
  const LOADER_PARAM = "showAppLoader"; // Bitely header checks showAppLoader=1
  const LOADER_TS_PARAM = "lbts";       // timestamp for short validity window

  // ✅ Discount code persistence keys
  const DISCOUNT_PARAM = "discountcode";
  const DISCOUNT_KEY = "discountcode_data";

  function now() {
    return Date.now();
  }

  function readStored() {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch {
      return null;
    }
  }

  function readStoredDiscount() {
    try {
      return JSON.parse(localStorage.getItem(DISCOUNT_KEY));
    } catch {
      return null;
    }
  }

  function store(value) {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        value,
        ts: now()
      })
    );
    console.log("📥 fbclid captured (first click):", value);
  }

  function storeDiscount(value) {
    localStorage.setItem(
      DISCOUNT_KEY,
      JSON.stringify({
        value,
        ts: now()
      })
    );
    console.log("🏷️ discountcode captured:", value);
  }

  function clear() {
    localStorage.removeItem(KEY);
    console.log("🧹 fbclid expired — cleared");
  }

  function clearDiscount() {
    localStorage.removeItem(DISCOUNT_KEY);
    console.log("🧹 discountcode expired — cleared (1 min TTL)");
  }

  // --- capture incoming fbclid ---
  const params = new URLSearchParams(window.location.search);
  const incoming = params.get("fbclid");
  const stored = readStored();

  // ✅ Only store on first capture or when value changes
  if (incoming && (!stored || stored.value !== incoming)) {
    store(incoming);
  }

  // --- capture incoming discount code ---
  const incomingDiscount = params.get(DISCOUNT_PARAM);
  const storedDiscount = readStoredDiscount();

  if (incomingDiscount && (!storedDiscount || storedDiscount.value !== incomingDiscount)) {
    storeDiscount(incomingDiscount);
  }

  // --- read active fbclid ---
  let active = readStored();

  // ✅ Enforce 7-day expiry for fbclid
  if (active && now() - active.ts > TTL_MS) {
    clear();
    active = null;
  }

  const fbclid = active?.value || null;
  if (fbclid) console.log("✅ fbclid active:", fbclid);
  else console.log("ℹ️ no fbclid stored (still patching Bitely loader baton)");

  // --- read active discount code ---
  let activeDiscount = readStoredDiscount();

  // ✅ Enforce 1-minute expiry for discount code
  if (activeDiscount && now() - activeDiscount.ts > DISCOUNT_TTL_MS) {
    clearDiscount();
    activeDiscount = null;
  }

  const discountcode = activeDiscount?.value || null;
  if (discountcode) console.log("✅ discountcode active:", discountcode);
  else console.log("ℹ️ no discountcode stored");

  // ✅ Append fbclid + discountcode + loader baton to internal + Bitely links
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) return;

    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    const isSameOrigin = url.origin === window.location.origin;
    const isAllowedExternal = ALLOWED_EXTERNAL_HOSTS.has(url.host);

    if (!isSameOrigin && !isAllowedExternal) return;

    // ✅ Add Bitely loader baton
    if (isAllowedExternal) {
      if (!url.searchParams.has(LOADER_PARAM)) {
        url.searchParams.set(LOADER_PARAM, "1");
        url.searchParams.set(LOADER_TS_PARAM, String(Date.now()));
      }
    }

    // ✅ Append fbclid if active
    if (fbclid && !url.searchParams.has("fbclid")) {
      url.searchParams.set("fbclid", fbclid);
    }

    // ✅ Append discountcode if still within 1 minute
