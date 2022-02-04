// <copyright file="RedisOptions.cs" company="Çevre Şehircilik ve İklim Değişikliği Bakanlığı - Coğrafi Bilgi sistemleri Genel Müdürlüğü">
// Copyright (c) Çevre Şehircilik ve İklim Değişikliği Bakanlığı - Coğrafi Bilgi sistemleri Genel Müdürlüğü - Yazılım Teknolojileri Daire Başkanlığı. Tüm hakları saklıdır.
// </copyright>

using System;

namespace Clean.Architecture.Infrastructure.Redis.Entities
{
    internal record RedisOptions
    {
        public int DatabaseId { get; set; }


        public string ConnectionString { get; set; }


        public TimeSpan Timeout { get; set; }
    }
}