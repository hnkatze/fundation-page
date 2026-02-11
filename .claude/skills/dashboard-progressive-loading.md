# Dashboard Progressive Loading

Patrón para optimizar dashboards con múltiples peticiones HTTP. En lugar de esperar a que todas las peticiones terminen (forkJoin monolítico), cada sección carga independientemente mostrando datos conforme llegan.

## Table of Contents

- [Problema](#problema)
- [Solución](#solución)
- [Paso 1: Identificar Secciones Visuales](#paso-1-identificar-secciones-visuales)
- [Paso 2: Loading States Granulares](#paso-2-loading-states-granulares)
- [Paso 3: Signals Individuales](#paso-3-signals-individuales)
- [Paso 4: Métodos de Carga Separados](#paso-4-métodos-de-carga-separados)
- [Paso 5: Template con Loading por Sección](#paso-5-template-con-loading-por-sección)
- [Paso 6: Lazy Loading de Tabs](#paso-6-lazy-loading-de-tabs)
- [Ejemplo Completo](#ejemplo-completo)
- [Checklist](#checklist)

## Problema

```typescript
// ❌ MALO: Todo o nada - pantalla en blanco hasta que TODAS terminen
private loadDashboardData(): void {
  this.isLoading.set(true);

  forkJoin({
    kpis: this.service.getKpis(),
    charts: this.service.getCharts(),
    tables: this.service.getTables(),
    // ... 10+ peticiones más
  }).subscribe({
    next: (result) => {
      this.data.set(result);
      this.isLoading.set(false); // Todo aparece de golpe
    }
  });
}
```

**Problemas:**
- Usuario ve pantalla en blanco por varios segundos
- Si una petición falla, todo falla
- Peticiones de tabs no visibles también se ejecutan

## Solución

1. **Carga progresiva por secciones**: Cada sección visual carga independientemente
2. **Lazy loading de tabs**: Solo cargar cuando el usuario entra a la tab
3. **Loading states granulares**: Skeleton por sección, no global

## Paso 1: Identificar Secciones Visuales

Analiza el template y agrupa las peticiones por sección visual:

```typescript
// Ejemplo: Dashboard de Customers
// Sección 1: KPIs (3 peticiones) - Aparecen primero (más rápidas)
// Sección 2: Tablas de ciudad (3 peticiones)
// Sección 3: Detalles (2 peticiones)
// Sección 4: Charts (3 peticiones)
// Sección 5: Tabla final (1 petición)
```

## Paso 2: Loading States Granulares

```typescript
// ❌ ANTES: Un solo loading
readonly isLoading = signal(false);

// ✅ DESPUÉS: Un loading por sección
readonly loadingKpis = signal(true);
readonly loadingCities = signal(true);
readonly loadingDetails = signal(true);
readonly loadingCharts = signal(true);
readonly loadingAcquisition = signal(true);

// Computed para loading global (útil para botones de refresh)
readonly isLoading = computed(() =>
  this.loadingKpis() ||
  this.loadingCities() ||
  this.loadingDetails() ||
  this.loadingCharts() ||
  this.loadingAcquisition()
);
```

## Paso 3: Signals Individuales

```typescript
// ❌ ANTES: Objeto monolítico
readonly dashboardData = signal<DashboardData | null>(null);

// En el template:
// dashboardData()?.kpis, dashboardData()?.charts, etc.

// ✅ DESPUÉS: Signals individuales por sección
// Sección 1: KPIs
readonly todayCount = signal<number>(0);
readonly yesterdayCount = signal<number>(0);
readonly totalCount = signal<number>(0);

// Sección 2: Tablas
readonly citiesToday = signal<CityData[]>([]);
readonly citiesYesterday = signal<CityData[]>([]);

// Sección 3: Charts
readonly chartData = signal<ChartData[]>([]);
```

## Paso 4: Métodos de Carga Separados

```typescript
ngOnInit(): void {
  this.loadDashboardData();
}

/**
 * Inicia todas las cargas en paralelo.
 * Cada sección maneja su propio loading state.
 */
private loadDashboardData(): void {
  this.error.set(null);

  // Ejecutar TODAS en paralelo (no secuencial)
  this.loadKpis();
  this.loadCitiesData();
  this.loadDetailsData();
  this.loadChartsData();
  this.loadAcquisitionData();
}

/**
 * Sección 1: KPIs
 */
private loadKpis(): void {
  this.loadingKpis.set(true);

  forkJoin({
    todayCount: this.service.getTotalRegisteredToday(),
    yesterdayCount: this.service.getTotalRegisteredYesterday(),
    totalCount: this.service.getTotalRegistered()
  }).subscribe({
    next: (result) => {
      this.todayCount.set(result.todayCount);
      this.yesterdayCount.set(result.yesterdayCount);
      this.totalCount.set(result.totalCount);
      this.loadingKpis.set(false);
    },
    error: (error) => {
      console.error('Error loading KPIs:', error);
      this.loadingKpis.set(false);
    }
  });
}

/**
 * Sección 2: Tablas de Ciudad
 */
private loadCitiesData(): void {
  this.loadingCities.set(true);

  forkJoin({
    citiesToday: this.service.getCitiesToday(),
    citiesYesterday: this.service.getCitiesYesterday(),
    citiesTotal: this.service.getCitiesTotal()
  }).subscribe({
    next: (result) => {
      this.citiesToday.set(result.citiesToday);
      this.citiesYesterday.set(result.citiesYesterday);
      this.citiesTotal.set(result.citiesTotal);
      this.loadingCities.set(false);
    },
    error: (error) => {
      console.error('Error loading cities:', error);
      this.loadingCities.set(false);
    }
  });
}

// ... similar para las demás secciones
```

## Paso 5: Template con Loading por Sección

```html
<!-- ========== SECCIÓN 1: KPIs ========== -->
<div class="grid grid-cols-3 gap-4 mb-4">
  @if (loadingKpis()) {
    @for (i of [1, 2, 3]; track i) {
      <p-card>
        <p-skeleton width="100%" height="120px" />
      </p-card>
    }
  } @else {
    @for (metric of metrics(); track metric.label) {
      <p-card>
        <!-- Contenido del KPI -->
      </p-card>
    }
  }
</div>

<!-- ========== SECCIÓN 2: Tablas ========== -->
<div class="grid grid-cols-3 gap-4">
  <p-card>
    @if (loadingCities()) {
      <p-skeleton width="100%" height="300px" />
    } @else {
      <p-table [value]="citiesToday()">
        <!-- ... -->
      </p-table>
    }
  </p-card>

  <!-- Más tablas con loadingCities() -->
</div>

<!-- ========== SECCIÓN 3: Charts ========== -->
<div class="grid grid-cols-3 gap-4 mt-4">
  @if (loadingCharts()) {
    <p-skeleton width="100%" height="300px" />
  } @else {
    <p-chart [data]="chartData()" />
  }
</div>
```

## Paso 6: Lazy Loading de Tabs

Si el dashboard tiene múltiples tabs, solo cargar la tab activa:

### Page Component (TypeScript)

```typescript
@Component({
  selector: 'app-dashboard-page',
  imports: [TabsModule, Tab1Component, Tab2Component],
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  readonly activeTabIndex = signal(0);

  // Track de tabs visitadas (una vez cargada, se mantiene)
  private readonly visitedTabs = signal<Set<number>>(new Set([0]));

  // Computed para lazy loading
  readonly shouldLoadTab1 = computed(() => this.visitedTabs().has(0));
  readonly shouldLoadTab2 = computed(() => this.visitedTabs().has(1));

  /**
   * Maneja el cambio de tab
   */
  onTabChange(value: string | number | undefined): void {
    const index = typeof value === 'number' ? value : 0;
    this.activeTabIndex.set(index);

    // Marcar tab como visitada
    if (!this.visitedTabs().has(index)) {
      this.visitedTabs.update(tabs => {
        const newTabs = new Set(tabs);
        newTabs.add(index);
        return newTabs;
      });
    }
  }
}
```

### Page Component (HTML)

```html
<p-tabs [value]="activeTabIndex()" (valueChange)="onTabChange($event)">
  <p-tablist>
    <p-tab [value]="0">Datos Generales</p-tab>
    <p-tab [value]="1">KPI Clientes</p-tab>
  </p-tablist>

  <p-tabpanels>
    <p-tabpanel [value]="0">
      @if (shouldLoadTab1()) {
        <app-tab1 />
      }
    </p-tabpanel>

    <p-tabpanel [value]="1">
      @if (shouldLoadTab2()) {
        <app-tab2 />
      }
    </p-tabpanel>
  </p-tabpanels>
</p-tabs>
```

## Ejemplo Completo

### Componente de Dashboard Tab

```typescript
import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatosGeneralesComponent implements OnInit {
  private readonly service = inject(DashboardService);

  // Loading states por sección
  readonly loadingKpis = signal(true);
  readonly loadingCities = signal(true);
  readonly loadingDetails = signal(true);
  readonly loadingCharts = signal(true);

  // Loading global
  readonly isLoading = computed(() =>
    this.loadingKpis() || this.loadingCities() ||
    this.loadingDetails() || this.loadingCharts()
  );

  // Data signals - Sección 1: KPIs
  readonly todayCount = signal(0);
  readonly yesterdayCount = signal(0);
  readonly totalCount = signal(0);

  // Data signals - Sección 2: Ciudades
  readonly citiesToday = signal<CityData[]>([]);
  readonly citiesYesterday = signal<CityData[]>([]);

  // Computed
  readonly metrics = computed(() => [
    { label: 'Hoy', value: this.todayCount(), icon: 'pi-calendar' },
    { label: 'Ayer', value: this.yesterdayCount(), icon: 'pi-history' },
    { label: 'Total', value: this.totalCount(), icon: 'pi-users' }
  ]);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loadKpis();
    this.loadCitiesData();
    this.loadDetailsData();
    this.loadChartsData();
  }

  private loadKpis(): void {
    this.loadingKpis.set(true);

    forkJoin({
      today: this.service.getTotalToday(),
      yesterday: this.service.getTotalYesterday(),
      total: this.service.getTotal()
    }).subscribe({
      next: (r) => {
        this.todayCount.set(r.today);
        this.yesterdayCount.set(r.yesterday);
        this.totalCount.set(r.total);
        this.loadingKpis.set(false);
      },
      error: () => this.loadingKpis.set(false)
    });
  }

  private loadCitiesData(): void {
    this.loadingCities.set(true);

    forkJoin({
      today: this.service.getCitiesToday(),
      yesterday: this.service.getCitiesYesterday()
    }).subscribe({
      next: (r) => {
        this.citiesToday.set(r.today);
        this.citiesYesterday.set(r.yesterday);
        this.loadingCities.set(false);
      },
      error: () => this.loadingCities.set(false)
    });
  }

  // ... más métodos de carga
}
```

## Checklist

### Para cada componente de dashboard tab:

- [ ] Identificar secciones visuales del template
- [ ] Crear loading signal por sección (`loadingKpis`, `loadingCities`, etc.)
- [ ] Crear computed `isLoading` que combine todos los loading states
- [ ] Crear signals individuales para datos (no objeto monolítico)
- [ ] Crear método de carga por sección (`loadKpis()`, `loadCities()`, etc.)
- [ ] Llamar todos los métodos de carga en paralelo desde `ngOnInit()`
- [ ] Actualizar template con loading state específico por sección
- [ ] Usar `<p-skeleton>` para cada sección mientras carga

### Para el page component con tabs:

- [ ] Crear signal `visitedTabs` como `Set<number>`
- [ ] Crear computed `shouldLoadTabX` por cada tab
- [ ] Implementar `onTabChange()` que marque tabs como visitadas
- [ ] Envolver cada tab component con `@if (shouldLoadTabX())`
- [ ] El tipo del parámetro debe ser `string | number | undefined`

### Beneficios esperados:

- [ ] KPIs aparecen primero (datos más ligeros)
- [ ] Contenido aparece progresivamente
- [ ] Tabs no visitadas no hacen peticiones
- [ ] Si una sección falla, las demás funcionan
- [ ] Cache del servicio sigue funcionando

---

**Recuerda:** Los datos más ligeros (contadores, KPIs) usualmente llegan primero. Agrupa las peticiones relacionadas visualmente, no por tipo de dato.
