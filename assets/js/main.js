document.addEventListener('DOMContentLoaded', () => {
    // Theme logic is now centrally handled in theme-toggle.js

    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            const icon = mobileToggle.querySelector('i');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                icon.className = 'ri-close-line';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'ri-menu-4-line';
                document.body.style.overflow = 'visible';
            }
        });

        // Close menu on link click (Exclude dropdown toggles)
        navLinks.querySelectorAll('a:not(.dropdown > .nav-link)').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').className = 'ri-menu-4-line';
                document.body.style.overflow = 'visible';
            });
        });
        // Mobile triggers for RTL/Theme inside the menu
        const mobileRtl = document.getElementById('mobile-rtl-trigger');
        const mobileTheme = document.getElementById('mobile-theme-trigger');
        
        if (mobileRtl) {
            mobileRtl.addEventListener('click', () => {
                document.getElementById('rtl-toggle')?.click();
            });
        }
        
        if (mobileTheme) {
            mobileTheme.addEventListener('click', () => {
                document.getElementById('theme-toggle')?.click();
                // Update mobile icon if needed
                const icon = mobileTheme.querySelector('i');
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                icon.className = isDark ? 'ri-moon-line' : 'ri-sun-line';
            });
        }

        // Mobile dropdown toggle logic
        navLinks.querySelectorAll('.dropdown > .nav-link').forEach(dropdownLink => {
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault(); // Prevent immediate navigation
                    const parent = dropdownLink.parentElement;
                    parent.classList.toggle('active');
                }
            });
        });
    }

    // Scroll Navbar Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Lazy Loading Setup
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // GSAP animations are handled in animations.js

    // Dynamic Blog Router - Generates unique detail pages from cards
    const blogCards = document.querySelectorAll('.blog-card');
    if (blogCards.length > 0) {
        blogCards.forEach(card => {
            const titleEl = card.querySelector('.blog-info h3');
            const catEl = card.querySelector('.blog-info h6');
            const imgEl = card.querySelector('.blog-img-wrapper img');
            const excerptEl = card.querySelector('.blog-info p');

            if (titleEl && catEl && imgEl) {
                const title = encodeURIComponent(titleEl.textContent.trim());
                const cat = encodeURIComponent(catEl.textContent.trim());
                const imgSrc = encodeURIComponent(imgEl.src);
                const excerpt = excerptEl ? encodeURIComponent(excerptEl.textContent.trim()) : '';

                const queryStr = `?title=${title}&cat=${cat}&img=${imgSrc}&exc=${excerpt}`;
                const detailLinks = card.querySelectorAll('a[href^="blog-details.html"]');

                detailLinks.forEach(link => {
                    link.href = `blog-details.html${queryStr}`;
                });
            }
        });
    }

    // Dynamic Blog Population - Reads URL parameters on the details template
    if (window.location.pathname.includes('blog-details') || document.querySelector('.blog-details')) {
        const urlParams = new URLSearchParams(window.location.search);
        const passedTitle = urlParams.get('title');

        if (passedTitle) {
            const passedCat = urlParams.get('cat');
            const passedImg = urlParams.get('img');
            const passedExc = urlParams.get('exc');

            const detailTitle = document.querySelector('.blog-details header h1');
            if (detailTitle) {
                detailTitle.textContent = passedTitle;
                document.title = `${passedTitle} | SOLACE RECORDS`;
            }

            const detailCat = document.querySelector('.blog-details header h6');
            if (detailCat && passedCat) {
                let datePart = 'JUNE 12, 2026';
                if (detailCat.textContent.includes('—')) {
                    datePart = detailCat.textContent.split('—')[0].trim();
                }
                detailCat.textContent = `${datePart} — ${passedCat}`;
            }

            const detailImg = document.querySelector('.blog-details .main-visual img');
            if (detailImg && passedImg) {
                detailImg.src = passedImg;
            }

            const dynamicQuote = document.querySelector('.blog-details .content h2');
            if (dynamicQuote) {
                dynamicQuote.textContent = `"${passedTitle}"`;
            }

            const firstParagraph = document.querySelector('.blog-details .content p');
            if (firstParagraph && passedExc) {
                firstParagraph.textContent = passedExc;
            }
        }
    }

    // Dynamic Product Router - Generates unique product details from cards
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        productCards.forEach(card => {
            const titleEl = card.querySelector('.product-info h4');
            const priceEl = card.querySelector('.product-info p');
            const imgEl = card.querySelector('.product-img-wrapper img');

            if (titleEl && priceEl && imgEl) {
                const title = encodeURIComponent(titleEl.textContent.trim());
                const price = encodeURIComponent(priceEl.textContent.trim());
                const imgSrc = encodeURIComponent(imgEl.src);

                const queryStr = `?title=${title}&price=${price}&img=${imgSrc}`;
                const detailLinks = card.querySelectorAll('a[href^="product-details.html"]');

                detailLinks.forEach(link => {
                    link.href = `product-details.html${queryStr}`;
                });
            }
        });
    }

    // Dynamic Product Population - Reads URL parameters on the product template
    if (window.location.pathname.includes('product-details') || document.querySelector('.product-details') || document.querySelector('.product-gallery')) {
        const urlParams = new URLSearchParams(window.location.search);
        const passedTitle = urlParams.get('title');

        if (passedTitle) {
            const passedPrice = urlParams.get('price');
            const passedImg = urlParams.get('img');

            const detailTitle = document.querySelector('h1.display-small'); // Product H1
            if (detailTitle) {
                // Safely set text content
                detailTitle.textContent = passedTitle;
                document.title = `${passedTitle} | SOLACE RECORDS SHOP`;
            }

            const detailPrice = document.querySelector('p.display-small.text-accent');
            if (detailPrice && passedPrice) {
                detailPrice.textContent = passedPrice;
            }

            const detailImg = document.querySelector('.product-gallery .main-image-wrapper img');
            if (detailImg && passedImg) {
                detailImg.src = passedImg;
            }
        }
    }

    // Dynamic Release Router - Generates unique release details from cards
    const releaseCards = document.querySelectorAll('.release-card');
    if (releaseCards.length > 0) {
        releaseCards.forEach(card => {
            const titleEl = card.querySelector('.release-info h4');
            const artistEl = card.querySelector('.release-info p');
            const imgEl = card.querySelector('.album-cover-wrapper img');

            if (titleEl && artistEl && imgEl) {
                const title = encodeURIComponent(titleEl.textContent.trim());
                const artist = encodeURIComponent(artistEl.textContent.trim());
                const imgSrc = encodeURIComponent(imgEl.src);

                const queryStr = `?title=${title}&artist=${artist}&img=${imgSrc}`;
                const detailLinks = card.querySelectorAll('a[href^="release-details.html"]');

                detailLinks.forEach(link => {
                    link.href = `release-details.html${queryStr}`;
                });
            }
        });
    }

    // Dynamic Release Population - Reads URL parameters on the release template
    if (window.location.pathname.includes('release-details') || document.querySelector('.release-cover')) {
        const urlParams = new URLSearchParams(window.location.search);
        const passedTitle = urlParams.get('title');

        if (passedTitle) {
            const passedArtist = urlParams.get('artist');
            const passedImg = urlParams.get('img');

            const detailTitle = document.querySelector('h1.display-medium'); // Release H1
            if (detailTitle) {
                detailTitle.textContent = passedTitle;
                document.title = `${passedTitle} | ${passedArtist} | SOLACE RECORDS`;
            }

            const artistLink = document.querySelector('h3.uppercase a.text-accent');
            if (artistLink && passedArtist) {
                artistLink.textContent = passedArtist;
            }

            const detailImg = document.querySelector('.release-cover img');
            if (detailImg && passedImg) {
                detailImg.src = passedImg;
            }
        }
    }

    // Shopping Cart Logic
    const CartManager = {
        items: [],

        init() {
            this.loadFromStorage();
            this.addEventListeners();
            this.updateBadge();
            this.renderCartPage();
        },

        loadFromStorage() {
            const saved = localStorage.getItem('solace_cart');
            if (saved) {
                this.items = JSON.parse(saved);
            }
        },

        saveToStorage() {
            localStorage.setItem('solace_cart', JSON.stringify(this.items));
        },

        addEventListeners() {
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn-add-to-cart');
                if (btn) {
                    const info = btn.closest('.product-info');
                    const product = {
                        id: info.dataset.id,
                        title: info.dataset.title,
                        price: parseFloat(info.dataset.price),
                        qty: 1,
                        img: info.closest('.product-card').querySelector('img').src
                    };
                    this.addItem(product, info);
                }

                if (e.target.closest('.qty-btn.plus')) {
                    const info = e.target.closest('.product-info, .cart-item-actions');
                    const id = info.dataset.id;
                    this.updateQty(id, 1, info);
                }

                if (e.target.closest('.qty-btn.minus')) {
                    const info = e.target.closest('.product-info, .cart-item-actions');
                    const id = info.dataset.id;
                    this.updateQty(id, -1, info);
                }

                if (e.target.closest('.remove-btn, .cart-remove')) {
                    const info = e.target.closest('.product-info, .cart-item');
                    const id = info.dataset.id;
                    this.removeItem(id, info);
                }
            });

            // Initialize Shop UI states based on loaded cart
            if (window.location.pathname.includes('shop.html')) {
                this.syncShopUI();
            }
        },

        syncShopUI() {
            this.items.forEach(item => {
                const card = document.querySelector(`.product-info[data-id="${item.id}"]`);
                if (card) {
                    card.closest('.product-card').classList.add('in-cart');
                    card.querySelector('.qty-val').textContent = item.qty;
                }
            });
        },

        addItem(product, container) {
            this.items.push(product);
            container.closest('.product-card').classList.add('in-cart');
            this.saveToStorage();
            this.updateBadge();
            this.animateBadge();
            this.renderCartPage();
        },

        updateQty(id, delta, container) {
            const item = this.items.find(i => i.id === id);
            if (item) {
                item.qty += delta;
                if (item.qty < 1) {
                    this.removeItem(id, container);
                } else {
                    if (container.querySelector('.qty-val')) {
                        container.querySelector('.qty-val').textContent = item.qty;
                    }
                    this.saveToStorage();
                    this.updateBadge();
                    this.renderCartPage();
                }
            }
        },

        removeItem(id, container) {
            this.items = this.items.filter(i => i.id !== id);
            if (container && container.closest('.product-card')) {
                container.closest('.product-card').classList.remove('in-cart');
                container.querySelector('.qty-val').textContent = '1';
            }
            this.saveToStorage();
            this.updateBadge();
            this.renderCartPage();
        },

        updateBadge() {
            const totalQty = this.items.reduce((sum, item) => sum + item.qty, 0);
            const badges = document.querySelectorAll('.cart-badge, .cart-count');
            badges.forEach(badge => {
                badge.textContent = totalQty;
            });
        },

        animateBadge() {
            const badges = document.querySelectorAll('.cart-badge');
            badges.forEach(badge => {
                badge.classList.add('pulse');
                setTimeout(() => badge.classList.remove('pulse'), 300);
            });
        },

        renderCartPage() {
            const fullCart = document.getElementById('full-cart');
            const emptyCart = document.getElementById('empty-cart');
            const container = document.getElementById('cart-items-container');

            if (!fullCart || !emptyCart || !container) return;

            if (this.items.length === 0) {
                fullCart.style.display = 'none';
                emptyCart.style.display = 'block';
            } else {
                fullCart.style.display = 'block';
                emptyCart.style.display = 'none';

                // Keep the header
                const header = container.querySelector('.cart-header').outerHTML;
                let html = header;

                this.items.forEach(item => {
                    html += `
                        <div class="cart-item py-5 border-bottom fade-up row align-items-center" data-id="${item.id}">
                            <div class="col-md-6 d-flex align-items-center">
                                <div class="item-img glass-card overflow-hidden" style="width: 100px; aspect-ratio: 1/1; background: var(--bg-surface);">
                                    <img src="${item.img}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <div class="ps-4">
                                    <h6 class="uppercase mb-2" style="font-size: 0.9rem;">${item.title}</h6>
                                    <div class="cart-item-actions" data-id="${item.id}">
                                         <a href="javascript:void(0)" class="cart-remove small border-bottom border-secondary text-secondary">Remove</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 text-center">$${item.price.toFixed(2)}</div>
                            <div class="col-md-2 text-center">
                                <div class="d-flex align-items-center justify-content-center gap-2 cart-item-actions" data-id="${item.id}">
                                    <button class="qty-btn minus" style="width: 25px; height: 25px;"><i class="ri-subtract-line"></i></button>
                                    <span class="qty-val">${item.qty}</span>
                                    <button class="qty-btn plus" style="width: 25px; height: 25px;"><i class="ri-add-line"></i></button>
                                </div>
                            </div>
                            <div class="col-md-2 text-end">$${(item.price * item.qty).toFixed(2)}</div>
                        </div>
                    `;
                });

                container.innerHTML = html;

                // Update summary
                const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
                document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
                document.getElementById('cart-total').textContent = `$${subtotal.toFixed(2)}`;
            }
        }
    };

    CartManager.init();
});
