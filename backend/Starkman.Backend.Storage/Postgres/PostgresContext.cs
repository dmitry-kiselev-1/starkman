using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Storage.Postgres
{
    public partial class PostgresContext : DbContext
    {
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Clientorder> Clientorder { get; set; }
        public virtual DbSet<Icon> Icon { get; set; }
        public virtual DbSet<Linking> Linking { get; set; }
        public virtual DbSet<Orderdetail> Orderdetail { get; set; }
        public virtual DbSet<Photo> Photo { get; set; }
        public virtual DbSet<Price> Price { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductHeight> ProductHeight { get; set; }
        public virtual DbSet<ProductPhoto> ProductPhoto { get; set; }
        public virtual DbSet<ProductPromotion> ProductPromotion { get; set; }
        public virtual DbSet<ProductSize> ProductSize { get; set; }
        public virtual DbSet<Promotion> Promotion { get; set; }
        public virtual DbSet<Seo> Seo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql(@"Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=password");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("category");

                entity.HasIndex(e => e.CategoryId)
                    .HasName("ix_category_id")
                    .IsUnique();

                entity.Property(e => e.CategoryId)
                    .HasColumnName("category_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.IconId).HasColumnName("icon_id");

                entity.Property(e => e.PhotoId).HasColumnName("photo_id");

                entity.Property(e => e.SeoId).HasColumnName("seo_id");
            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.ToTable("client");

                entity.HasIndex(e => e.ClientId)
                    .HasName("ix_client_id")
                    .IsUnique();

                entity.Property(e => e.ClientId)
                    .HasColumnName("client_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email");

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasColumnName("login");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone");

                entity.Property(e => e.Registrationdate)
                    .HasColumnName("registrationdate")
                    .HasColumnType("date");
            });

            modelBuilder.Entity<Clientorder>(entity =>
            {
                entity.ToTable("clientorder");

                entity.HasIndex(e => e.ClientId)
                    .HasName("ix_clientorder_client_id");

                entity.HasIndex(e => e.ClientorderId)
                    .HasName("ix_clientorder_id")
                    .IsUnique();

                entity.Property(e => e.ClientorderId)
                    .HasColumnName("clientorder_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ClientId).HasColumnName("client_id");

                entity.Property(e => e.Orderdate)
                    .HasColumnName("orderdate")
                    .HasColumnType("date");

                entity.Property(e => e.Orderdateprice)
                    .HasColumnName("orderdateprice")
                    .HasColumnType("money");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Clientorder)
                    .HasForeignKey(d => d.ClientId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_clientorder_client");
            });

            modelBuilder.Entity<Icon>(entity =>
            {
                entity.ToTable("icon");

                entity.HasIndex(e => e.IconId)
                    .HasName("ix_icon_id")
                    .IsUnique();

                entity.Property(e => e.IconId)
                    .HasColumnName("icon_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.SeoId).HasColumnName("seo_id");
            });

            modelBuilder.Entity<Linking>(entity =>
            {
                entity.HasKey(e => new { e.ProductId, e.ProductIdLink });

                entity.ToTable("linking");

                entity.HasIndex(e => new { e.ProductId, e.ProductIdLink })
                    .HasName("ix_linking")
                    .IsUnique();

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.ProductIdLink).HasColumnName("product_id_link");
            });

            modelBuilder.Entity<Orderdetail>(entity =>
            {
                entity.ToTable("orderdetail");

                entity.HasIndex(e => e.ClientorderId)
                    .HasName("ix_orderdetail_clientorder_id");

                entity.HasIndex(e => e.OrderdetailId)
                    .HasName("ix_orderdetail_id")
                    .IsUnique();

                entity.HasIndex(e => e.PriceId)
                    .HasName("ix_orderdetail_price_id");

                entity.HasIndex(e => e.ProductId)
                    .HasName("ix_orderdetail_product_id");

                entity.Property(e => e.OrderdetailId)
                    .HasColumnName("orderdetail_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ClientorderId).HasColumnName("clientorder_id");

                entity.Property(e => e.Orderdateprice)
                    .HasColumnName("orderdateprice")
                    .HasColumnType("money");

                entity.Property(e => e.PriceId).HasColumnName("price_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.HasOne(d => d.Clientorder)
                    .WithMany(p => p.Orderdetail)
                    .HasForeignKey(d => d.ClientorderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_orderdetail_clientorder");

                entity.HasOne(d => d.Price)
                    .WithMany(p => p.Orderdetail)
                    .HasForeignKey(d => d.PriceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_orderdetail_price");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Orderdetail)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_orderdetail_product");
            });

            modelBuilder.Entity<Photo>(entity =>
            {
                entity.ToTable("photo");

                entity.HasIndex(e => e.PhotoId)
                    .HasName("ix_photo_id")
                    .IsUnique();

                entity.Property(e => e.PhotoId)
                    .HasColumnName("photo_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.SeoId).HasColumnName("seo_id");
            });

            modelBuilder.Entity<Price>(entity =>
            {
                entity.ToTable("price");

                entity.HasIndex(e => e.PriceId)
                    .HasName("ix_price_id")
                    .IsUnique();

                entity.HasIndex(e => e.ProductId)
                    .HasName("ix_price_product_id");

                entity.Property(e => e.PriceId)
                    .HasColumnName("price_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Count).HasColumnName("count");

                entity.Property(e => e.Height).HasColumnName("height");

                entity.Property(e => e.Price1)
                    .HasColumnName("price")
                    .HasColumnType("money");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Size).HasColumnName("size");

                entity.HasOne(d => d.HeightNavigation)
                    .WithMany(p => p.Price)
                    .HasForeignKey(d => d.Height)
                    .HasConstraintName("fk_height_price");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Price)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("fk_price_product");

                entity.HasOne(d => d.SizeNavigation)
                    .WithMany(p => p.Price)
                    .HasForeignKey(d => d.Size)
                    .HasConstraintName("fk_size_price");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.HasIndex(e => e.CategoryId)
                    .HasName("ix_product_category_id");

                entity.HasIndex(e => e.ProductId)
                    .HasName("ix_product_id")
                    .IsUnique();

                entity.HasIndex(e => e.Sku)
                    .HasName("ix_product_sku")
                    .IsUnique();

                entity.Property(e => e.ProductId)
                    .HasColumnName("product_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.SeoId).HasColumnName("seo_id");

                entity.Property(e => e.Sku).HasColumnName("sku");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_product_category");
            });

            modelBuilder.Entity<ProductHeight>(entity =>
            {
                entity.HasKey(e => e.Height);

                entity.ToTable("product_height");

                entity.HasIndex(e => e.Height)
                    .HasName("ix_productheight")
                    .IsUnique();

                entity.Property(e => e.Height)
                    .HasColumnName("height")
                    .ValueGeneratedNever();

                entity.Property(e => e.SortOrder).HasColumnName("sort_order");
            });

            modelBuilder.Entity<ProductPhoto>(entity =>
            {
                entity.HasKey(e => new { e.ProductId, e.PhotoId });

                entity.ToTable("product_photo");

                entity.HasIndex(e => new { e.ProductId, e.PhotoId })
                    .HasName("ix_product_photo")
                    .IsUnique();

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.PhotoId).HasColumnName("photo_id");

                entity.HasOne(d => d.Photo)
                    .WithMany(p => p.ProductPhoto)
                    .HasForeignKey(d => d.PhotoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_photoproduct_photo");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductPhoto)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_productphoto_product");
            });

            modelBuilder.Entity<ProductPromotion>(entity =>
            {
                entity.HasKey(e => new { e.PromotionId, e.ProductId });

                entity.ToTable("product_promotion");

                entity.HasIndex(e => new { e.PromotionId, e.ProductId })
                    .HasName("ix_product_promotion")
                    .IsUnique();

                entity.Property(e => e.PromotionId).HasColumnName("promotion_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductPromotion)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_productpromotion_product");

                entity.HasOne(d => d.Promotion)
                    .WithMany(p => p.ProductPromotion)
                    .HasForeignKey(d => d.PromotionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_productpromotion_promotion");
            });

            modelBuilder.Entity<ProductSize>(entity =>
            {
                entity.HasKey(e => e.Size);

                entity.ToTable("product_size");

                entity.HasIndex(e => e.Size)
                    .HasName("ix_productsize")
                    .IsUnique();

                entity.Property(e => e.Size)
                    .HasColumnName("size")
                    .ValueGeneratedNever();

                entity.Property(e => e.SortOrder).HasColumnName("sort_order");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.ToTable("promotion");

                entity.HasIndex(e => e.PromotionId)
                    .HasName("ix_promotion_id")
                    .IsUnique();

                entity.Property(e => e.PromotionId)
                    .HasColumnName("promotion_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.SeoId).HasColumnName("seo_id");
            });

            modelBuilder.Entity<Seo>(entity =>
            {
                entity.ToTable("seo");

                entity.HasIndex(e => e.SeoId)
                    .HasName("ix_seo_id")
                    .IsUnique();

                entity.HasIndex(e => e.Url)
                    .HasName("ix_seo_url")
                    .IsUnique();

                entity.Property(e => e.SeoId)
                    .HasColumnName("seo_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.MetaDescription).HasColumnName("meta_description");

                entity.Property(e => e.MetaKeywords).HasColumnName("meta_keywords");

                entity.Property(e => e.SortOrder).HasColumnName("sort_order");

                entity.Property(e => e.Title).HasColumnName("title");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasColumnName("url");

                entity.Property(e => e.UrlParent).HasColumnName("url_parent");
            });
        }
    }
}
